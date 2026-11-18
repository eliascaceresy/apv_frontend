import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-30 gap-30 p-5 items-center">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
