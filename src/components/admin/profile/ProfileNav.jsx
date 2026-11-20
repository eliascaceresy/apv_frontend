import { Link } from "react-router";

const ProfileNav = () => {
  return (
    <nav>
      <Link to="/admin/profile" className="font-bold text-gray-500 uppercase">
        Perfil
      </Link>
      <Link to="/admin/change_password" className="font-bold text-gray-500 uppercase ml-5">
        Cambiar Contraseña
      </Link>
    </nav>
  );
};

export default ProfileNav;
