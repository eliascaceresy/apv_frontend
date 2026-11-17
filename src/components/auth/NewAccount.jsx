import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { createAccount } from "./axios";

const NewAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const notify = (message, type) => {
    switch (type) {
      case "error":
        toast.error(message, {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
        });
        break;
      case "success":
        toast.success(message, {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
        });
        break;
      default:
        toast.info(message, {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
        });
        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if ([name, email, password, passwordConfirmation].includes("")) {
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

    try {
      createAccount({ name, email, password }, response => {
        console.log(response.status);
        if (response.status === 201) {
          notify("Cuenta creada exitosamente! Revisa tu email", "success");
        } else {
          notify(response?.data?.msg, "error");
        }

        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
      });
    } catch (error) {
      notify(error, "error");
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
            <input
              type="text"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
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
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Contraseña <span className="text-xs">(mínimo 6 caracteres)</span>
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
            value="Registrarme"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-cener my-5 text-gray-500">
            Ya tengo cuenta!
          </Link>
          <Link to="/forget_password" className="block text-cener my-5 text-gray-500">
            Olvide mi contraseña!
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NewAccount;
