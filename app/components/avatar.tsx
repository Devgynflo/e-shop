import { NextPage } from "next";
import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

export const Avatar: NextPage<AvatarProps> = ({ src }) => {
  if (!src) {
    src = "https://i.pravatar.cc/30";
  }
  return (
    <Image
      priority
      className="rounded-full"
      height={30}
      width={30}
      src={src}
      alt="Avatar"
    />
  );
};
