"use client";

import { SafeUser } from "@/@types";
import { Heading } from "@/app/components/heading";
import { Inputs } from "@/app/components/inputs/inputs";
import { Button } from "@/app/components/products/details/_components/button";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

export const LoginForm: NextPage<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit = (values: FieldValues) => {
    setIsLoading(true);
    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/");
          router.refresh();
          toast.success("Connecté");
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch(() => toast.error("Quelque chose s'est mal passée !"))
      .finally(() => setIsLoading(false));
  };

  if (currentUser) {
    return <p className="text-center">Connecté. Redirection</p>;
  }
  return (
    <>
      <Heading title="Connectez-vous" />
      <Button
        outline
        label="Connexion avec Google"
        icon={AiOutlineGoogle}
        onclick={() => {
          signIn("google");
        }}
      />
      <hr className="h-px w-full bg-slate-300" />
      <Inputs
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type={"text"}
      />
      <Inputs
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type={"password"}
      />
      <Button
        label={isLoading ? "Chargement..." : "Connexion"}
        onclick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Pas encore de compte?{" "}
        <Link className="underline" href={"/register"}>
          Créez-en un
        </Link>
      </p>
    </>
  );
};
