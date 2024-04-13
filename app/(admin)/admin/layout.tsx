import { getCurrentUser } from "@/actions/get-current-user";
import { NextPage } from "next";
import { AdminNavbar } from "./_components/navbar";
import { NullData } from "./_components/null-data";

export const metadata = {
  title: `E-shop Admin`,
  description: `E~Shop Admin Dashboard`,
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: NextPage<AdminLayoutProps> = async ({ children }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Acces denied" />;
  }

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

export default AdminLayout;
