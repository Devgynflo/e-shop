import { getCurrentUser } from "@/actions/get-current-user";
import { NextPage } from "next";
import { AdminNavbar } from "../../components/admin/navbar";
import { NullData } from "../../components/null-data";

export const metadata = {
  title: `E-shop Admin`,
  description: `Tableau de bord Admin`,
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: NextPage<AdminLayoutProps> = async ({ children }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Accès refusé" />;
  }

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

export default AdminLayout;
