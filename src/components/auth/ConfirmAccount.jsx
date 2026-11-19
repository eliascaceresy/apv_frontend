import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import notify from "../utils/notify";
import confirmAccount from "../../services/authServices/confirmAccount";
import Loader from "../common/Loader";

const ConfirmAccount = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = params;

  const handleConfirmAccount = () => {
    setLoading(true);
    try {
      confirmAccount(token, response => {
        console.log(response);
        if (response.status === 200) {
          notify("La cuenta se ha confirmado exitosamente! ya puedes iniciar sesión.", "success");
          navigate("/");
        } else {
          notify(response?.data?.msg, "error");
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl text-center">
          Confirma tu Cuenta y Comienza a Administrar tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <Loader loading={loading} />
        <button
          type="button"
          className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          onClick={handleConfirmAccount}
        >
          Confirmar Cuenta
        </button>
      </div>
    </>
  );
};

export default ConfirmAccount;
