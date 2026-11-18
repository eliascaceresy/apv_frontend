import { useState } from "react";
import { Link } from "react-router";
import { FadeLoader } from "react-spinners";
import notify from "./../utils/notify";
import forgetPassword from "../../services/authServices/forgetPassword";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (email.trim() === "") {
      notify("Debes ingresar un email!", "error");
      return;
    }

    setLoading(true);

    try {
      forgetPassword({ email }, response => {
        notify(response?.data?.msg, "success");
        setLoading(false);
        setEmail("");
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
          Recupera tu Cuenta y Administra tus <span className="text-black">Pacientes</span>
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
            value="Enviar Instrucciones"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
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

export default ForgetPassword;
