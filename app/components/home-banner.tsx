import { NextPage } from "next";
import Image from "next/image";

interface HomeBannerProps {}

export const HomeBanner: NextPage<HomeBannerProps> = ({}) => {
  return (
    <section className="relative mb-8 bg-gradient-to-r from-sky-500 to-sky-700">
      <div className="mx-auto flex flex-col items-center justify-evenly gap-2  px-8 py-12 md:flex-row">
        <div className="mb-8 text-center md:mb-0">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-6xl">
            Summer Sale!
          </h1>
          <p className="mb-2 text-lg text-white md:text-5xl">
            Enjoy discounts on selected items
          </p>
          <p className="text-2xl font-bold uppercase text-yellow-400 md:text-5xl">
            Get 50% off
          </p>
        </div>
        <div className="relative aspect-video w-1/3">
          <Image
            className="object-contain"
            src={"/banner/banner-image.png"}
            alt="image-banner"
            fill
            priority
            sizes="100%"
          />
        </div>
      </div>
    </section>
  );
};
