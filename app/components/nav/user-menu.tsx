"use client";

import { SafeUser } from "@/@types";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Avatar } from "../avatar";
import { BackDrop } from "../backDrop";
import { UserMenuItem } from "./user-menu-item";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

export const UserMenu: NextPage<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative z-30">
      <div
        onClick={toggleOpen}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-400 p-2 text-slate-700 transition hover:shadow-md"
      >
        <Avatar src={currentUser?.image} />
        <AiFillCaretDown />
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 z-30 flex w-[170px] cursor-pointer flex-col overflow-hidden rounded-md bg-white text-sm shadow-md">
          {currentUser && (
            <div>
              <Link href={"/orders"}>
                <UserMenuItem onClick={toggleOpen}>Your Orders</UserMenuItem>
              </Link>
              <Link href={"/admin"}>
                <UserMenuItem onClick={toggleOpen}>
                  Admin Dashboard
                </UserMenuItem>
              </Link>
              <hr />
              <UserMenuItem
                onClick={() => {
                  toggleOpen();
                  signOut();
                }}
              >
                Logout
              </UserMenuItem>
            </div>
          )}

          {!currentUser && (
            <div>
              <Link href={"/login"}>
                <UserMenuItem onClick={toggleOpen}>Login</UserMenuItem>
              </Link>
              <Link href={"/register"}>
                <UserMenuItem onClick={toggleOpen}>Sign up</UserMenuItem>
              </Link>
            </div>
          )}
        </div>
      )}

      {isOpen && <BackDrop onClick={toggleOpen} />}
    </div>
  );
};
