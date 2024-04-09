"use client";

import { NextPage } from "next";

interface UserMenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const UserMenuItem: NextPage<UserMenuItemProps> = ({
  children,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 transition hover:bg-neutral-100"
    >
      {children}
    </div>
  );
};
