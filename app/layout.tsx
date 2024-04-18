import Footer from "@/app/components/footer/footer";
import { Navbar } from "@/app/components/nav/navbar";
import { cn } from "@/lib/utils";
import CartProvider from "@/providers/Cart-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Categories } from "./components/nav/categories";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Ecommerce app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(poppins.className, "text-slate-700")}>
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <Suspense>
              <Categories />
              <main className="flex-grow">{children}</main>
            </Suspense>

            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
