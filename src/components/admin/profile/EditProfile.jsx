import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import ProfileNav from "./ProfileNav";
import notify from "./../../utils/notify";

const EditProfile = () => {
  const { auth, updateProfile } = useAuth();

  const [profile, setProfile] = useState({});

  useEffect(() => {
    const { name, web, phone, email } = auth.profile;
    setProfile({ ...profile, name, web, phone, email });
  }, [auth]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, email } = profile;

    if ([name, email].includes("")) {
      notify("Nombre y Correo son obligatorios!", "error");
      return;
    }

    updateProfile(auth.profile._id, profile);
  };

  return (
    <>
      <ProfileNav />
      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu <span className="text-indigo-600 font-bold">Perfil</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 shadow rounded-lg bg-white p-5">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Nombre</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={profile.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Sitio Web</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={profile.web || ""}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Teléfono</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="phone"
                value={profile.phone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={profile.email || ""}
                onChange={handleChange}
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

export default EditProfile;
