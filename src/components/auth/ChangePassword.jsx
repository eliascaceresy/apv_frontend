import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FadeLoader } from "react-spinners";
import notify from "../utils/notify";
import checkTokenChangePassword from "../../services/authServices/checkTokenChangePassword";
import changePassword from "../../services/authServices/changePassword";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        checkTokenChangePassword(token, response => {
          if (response.status === 200) {
            setValidToken(true);
          } else {
            notify("Opps! Hubo un error con el link, favor solicita uno nuevo.", "error");
          }
        });
      } catch (error) {
        notify(error, "error");
      }
    };

    checkToken();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if ([password, passwordConfirmation].includes("")) {
      notify("Todos los campos son obligatorios!", "error");
      return;
    }

    if (password.length < 6) {
      notify("La contraseña debe tener mínimo 6 caracteres!", "error");
      return;
    }

    if (password !== passwordConfirmation) {
      notify("Las contraseña no coinciden!", "error");
      return;
    }

    setLoading(true);

    const data = { password, password_confirmation: passwordConfirmation };
    changePassword(token, data, response => {
      if (response.status === 200) {
        notify(response?.data?.msg, "success");
        setLoading(false);
        setPassword("");
        setPasswordConfirmation("");
        navigate("/");
      }
    });
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Cambia tu Contraseña y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nueva Contraseña <span className="text-xs">(mínimo 6 caracteres)</span>
            </label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Confirma tu Contraseña</label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
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
            value="Cambiar Contraseña"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
            disabled={!validToken}
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-cener my-5 text-gray-500">
            Ya tengo cuenta!
          </Link>
          <Link to="/new_account" className="block text-cener my-5 text-gray-500">
            No tienes una cuenta? Registrate!
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ChangePassword;
