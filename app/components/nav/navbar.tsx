import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { Redressed } from "next/font/google";
import Link from "next/link";
import { Container } from "../container";
import { CartCount } from "./cart-count";

const redressed = Redressed({ subsets: ["latin"], weight: "400" });

interface NavbarProps {}

export const Navbar: NextPage<NavbarProps> = ({}) => {
  return (
    <div className="sticky top-0 z-30 w-full bg-slate-200 shadow-sm">
      <div className="border-b py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href={"/"}
              className={cn(redressed.className, "font-semi-bold text-2xl ")}
            >
              E-shop
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="items-cnter flex gap-8 md:gap-12">
              <CartCount />
              <div>UserMenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
