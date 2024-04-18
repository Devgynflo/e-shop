"use client";

import { SafeUser } from "@/@types";
import { Heading } from "@/app/components/heading";
import { Inputs } from "@/app/components/inputs/inputs";
import { Button } from "@/app/components/products/details/_components/button";
import axios from "axios";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

export const RegisterForm: NextPage<RegisterFormProps> = ({ currentUser }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
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
    axios.post("/api/register", values).then(() => {
      toast.success("Account created");

      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            router.push("/");
            router.refresh();
            toast.success("Logged In");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        })
        .catch(() => toast.error("Something wnet wrong !"))
        .finally(() => setIsLoading(false));
    });
  };

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }

  return (
    <>
      <Heading title="Sign up for E~Shop" />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onclick={() => {}}
      />
      <hr className="h-px w-full bg-slate-300" />
      <Inputs
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type={"text"}
      />
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
        label={isLoading ? "Loading..." : "Sign up"}
        onclick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account ?{" "}
        <Link className="underline" href={"/login"}>
          Log in
        </Link>
      </p>
    </>
  );
};
