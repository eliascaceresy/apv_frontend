import { Link } from "react-router";

const Login = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div>
        <form>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
            <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/new_account" className="block text-cener my-5 text-gray-500">
            No tiene una cuenta? Registrate!
          </Link>
          <Link to="/forget_password" className="block text-cener my-5 text-gray-500">
            Olvide mi contraseña!
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
