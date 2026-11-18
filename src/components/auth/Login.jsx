import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import notify from "./../utils/notify";
import { FadeLoader } from "react-spinners";
import login from "../../services/authServices/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if ([email, password].includes("")) {
      notify("Email y Contraseña son obligatorios!", "error");
      return;
    }

    setLoading(true);
    login({ email, password }, response => {
      if (response.status === 200) {
        localStorage.setItem("session", response.data.token);
        setTimeout(() => {
          setLoading(false);
          navigate("/admin");
        }, 2000);
      } else {
        notify(response.data.msg, "error");
      }
    });
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input
              type="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <FadeLoader
            color={"#4f39f6"}
            loading={loading}
            cssOverride={{
              display: "block",
              margin: "0 auto",
              borderColor: "red",
            }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/new_account" className="block text-cener my-5 text-gray-500">
            No tienes una cuenta? Registrate!
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
