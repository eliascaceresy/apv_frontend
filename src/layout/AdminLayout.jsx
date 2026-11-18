import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const AdminLayout = () => {
  const { auth, loadingAuth } = useAuth();
  console.log(auth);

  if (loadingAuth) return "cargando...";

  return (
    <>
      <main className="">
        <Header />
        {auth?.profile?._id ? (
          <main className="container mx-auto mt-10">
            <Outlet />
          </main>
        ) : (
          <Navigate to="/" />
        )}
        <Footer />
      </main>
    </>
  );
};

export default AdminLayout;
