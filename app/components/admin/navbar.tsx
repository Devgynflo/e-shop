"use client";

import { Container } from "@/app/components/container";
import { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { NavbarItems } from "./navbar-items";

interface AdminNavbarProps {}

export const AdminNavbar: NextPage<AdminNavbarProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div className="top-20 w-full border-b pt-4 shadow-sm">
      <Container>
        <div className="flex flex-nowrap items-center justify-between gap-8 overflow-x-auto md:justify-center md:gap-12 ">
          <Link href={"/admin"}>
            <NavbarItems
              label="Sommaire"
              icon={MdDashboard}
              isSelected={pathname === "/admin"}
            />
          </Link>
          <Link href={"/admin/add-products"}>
            <NavbarItems
              label="Ajouter un produit"
              icon={MdLibraryAdd}
              isSelected={pathname === "/admin/add-products"}
            />
          </Link>
          <Link href={"/admin/manage-products"}>
            <NavbarItems
              label="Gestion des produits"
              icon={MdDns}
              isSelected={pathname === "/admin/manage-products"}
            />
          </Link>
          <Link href={"/admin/manage-orders"}>
            <NavbarItems
              label="Gestions des commandes"
              icon={MdFormatListBulleted}
              isSelected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};
