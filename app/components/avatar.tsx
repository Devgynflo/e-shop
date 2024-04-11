import { NextPage } from "next";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
  src?: string | null | undefined;
}

export const Avatar: NextPage<AvatarProps> = ({ src }) => {
  if (!src) {
    return <RxAvatar size={24} />;
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
