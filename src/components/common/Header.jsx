import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Administrador de Pacientes de <span className="text-white font-black">Veterinaria</span>
        </h1>
        <nav className="flex gap-4 mt-5 md:mt-0">
          <Link to="/admin" className="text-white uppercase font-bold text-sm">
            Pacientes
          </Link>
          <Link to="/admin/profile" className="text-white uppercase font-bold text-sm">
            Perfil
          </Link>

          <button type="button" onClick={logout} className="text-white uppercase font-bold text-sm">
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
