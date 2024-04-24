"use client";

import { ImageType, UploadedImageType } from "@/@types";
import { Heading } from "@/app/components/heading";
import { CategoryInput } from "@/app/components/inputs/category-input";
import { CustomCheckbox } from "@/app/components/inputs/custom_checkbox";
import { Inputs } from "@/app/components/inputs/inputs";
import { SelectColor } from "@/app/components/inputs/select-color";
import { TextArea } from "@/app/components/inputs/text-area";
import { Button } from "@/app/components/products/details/_components/button";
import FirebaseApp from "@/lib/firebase/firebase";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddProductFormProps {}

export const AddProductForm: NextPage<AddProductFormProps> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      price: "",
      images: [],
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setCustomValue("images", images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color,
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      return toast.error("Categorie non selectionné");
    }
    if (!data.images || data.images.length === 0) {
      return toast.error("Aucune images selectionné");
    }

    const handleImageUploads = async () => {
      toast("Creation du produit, patientez...");

      try {
        for (const item of data.images) {
          if (item) {
            const filename = new Date().getTime() + "-" + item.image.name; // file name must be unique
            const storage = getStorage(FirebaseApp);
            const storageRef = ref(storage, `products/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  //console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      //console.log("Upload is paused");
                      break;
                    case "running":
                      //console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Erreur de téléchargement de l'image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      //console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      //console.log("error uploading", error);
                      reject(error);
                    });
                },
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        //console.log("error uploading", error);
        return toast.error("Erreur de téléchargement des images");
      }
    };
    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };
    // save product to mongodb
    axios
      .post("/api/product", productData)
      .then(() => {
        setIsProductCreated(true);
        toast.success("Produit crée");
        router.refresh();
      })
      .catch(() => {
        toast.error("Erreur avec la base de donnée");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Ajoutez un produit" center />
      <Inputs
        id="name"
        label="Nom"
        disabled={isLoading}
        type="text"
        register={register}
        errors={errors}
        required
      />
      <Inputs
        id="price"
        label="Prix"
        disabled={isLoading}
        type="number"
        register={register}
        errors={errors}
        required
      />
      <Inputs
        id="brand"
        label="Marque"
        disabled={isLoading}
        type="text"
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id={"inStock"}
        label={"Ce produit est en stock "}
        disabled={isLoading}
        register={register}
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-bold">Selectionnez une catégorie</div>
        <div className="max-h-[50vh ] grid grid-cols-2 gap-2 overflow-y-auto md:grid-cols-3">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                  onClick={(category) => setCustomValue("category", category)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Sélectionnez les couleurs de produits disponibles et téléchargez
            leurs images.
          </div>
          <div className="text-sm">
            Vous devez télécharger une image pour chacune des couleurs
            sélectionnées, sinon votre sélection de couleur sera ignorée.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item) => {
            return (
              <SelectColor
                item={item}
                key={item.colorCode}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Chargement..." : "Ajoutez le produit"}
        onclick={handleSubmit(onSubmit)}
      />
    </>
  );
};
