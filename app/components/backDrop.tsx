"use client";

import { NextPage } from "next";

interface BackDropProps {
  onClick: () => void;
}

export const BackDrop: NextPage<BackDropProps> = ({ onClick }) => {
  return (
    <div
      className="fixed left-0 top-0 z-20 h-screen w-screen bg-slate-200 opacity-50"
      onClick={onClick}
    ></div>
  );
};
