import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import ProfileNav from "./ProfileNav";
import notify from "../../utils/notify";

const ChangeProfilePassword = () => {
  const { changeProfilePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if ([password, currentPassword, passwordConfirmation].includes("")) {
      notify("Todos los campos son obligatorios!", "error");
      return;
    }

    if (password !== passwordConfirmation) {
      notify("La nueva contraseña no coincide!", "error");
      return;
    }

    if (password.length < 6) {
      notify("La nueva contraseña debe tener mínimo 6 caracteres!", "error");
      return;
    }

    try {
      changeProfilePassword({ currentPassword, password, passwordConfirmation }, response => {
        if (response.status === 200) {
          setPassword("");
          setPasswordConfirmation("");
          setCurrentPassword("");
        }
      });
    } catch (error) {
      notify(error, "error");
    }
  };

  return (
    <>
      <ProfileNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar Contraseña</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu <span className="text-indigo-600 font-bold">Contraseña</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 shadow rounded-lg bg-white p-5">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Contraseña Actual</label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="currentPassword"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nueva Contraseña <span className="text-xs">(Mínimo 6 caracteres)</span>
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeProfilePassword;
