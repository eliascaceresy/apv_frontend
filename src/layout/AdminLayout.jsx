import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const AdminLayout = () => {
  const { status, retrySession } = useAuth();

  if (status === "checking") {
    return <p role="status" className="p-5 text-center">Verificando sesión...</p>;
  }

  if (status === "error") {
    return (
      <main className="p-5 text-center">
        <p>No se pudo verificar la sesión. Comprueba tu conexión e inténtalo de nuevo.</p>
        <button type="button" onClick={retrySession} className="mt-4 text-indigo-600 underline">
          Reintentar
        </button>
      </main>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <main className="">
        <Header />
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
        <Footer />
      </main>
    </>
  );
};

export default AdminLayout;
