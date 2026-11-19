import { useState } from "react";
import notify from "./../utils/notify";
import Loader from "../common/Loader";
import createPatient from "../../services/patientServices/createPatient";
import usePatients from "../../hooks/usePatients";

const PatientsForm = () => {
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [registrationAt, setRegistrationAt] = useState("");
  const [petSymptoms, setPetSymptoms] = useState("");
  const [petType, setPetType] = useState("");
  const [loading, setLoading] = useState(false);

  const { savePatient } = usePatients();

  const clearForm = () => {
    setPetName("");
    setOwnerName("");
    setOwnerPhone("");
    setOwnerEmail("");
    setRegistrationAt("");
    setPetSymptoms("");
    setPetType("");
  };

  const handleSubmit = e => {
    e.preventDefault();

    if ([petName, ownerName, ownerPhone, ownerEmail, registrationAt, petSymptoms, petType].includes("")) {
      notify("Todos los campos son obligatorios!", "error");
      return;
    }

    setLoading(true);
    const pet = { petName, ownerName, ownerPhone, ownerEmail, petSymptoms, registrationAt, petType };

    try {
      createPatient(pet, response => {
        if (response.status === 201) {
          savePatient(response.data.patient);
          notify("Paciente creado exitosamente!", "success");
        } else if (response.status === 422) {
          notify(response.statusText, "error");
        }
        clearForm();
        setLoading(false);
      });
    } catch (error) {
      notify(error, "error");
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="font-black text-3xl text-center">Formulario de Pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Administra tus Pacientes y <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <div className="shadow-lg px-10 py-10 rounded-xl bg-white mb-10 lg:mb-0">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="petName" className="text-gray-700 uppercase font-bold">
              Nombre Mascota
            </label>
            <input
              id="petName"
              type="text"
              placeholder="Nombre de la Mascota"
              className="p-1 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md"
              name="petName"
              value={petName}
              onChange={e => setPetName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="ownerName" className="text-gray-700 uppercase font-bold">
              Nombre Propietario
            </label>
            <input
              id="ownerName"
              type="text"
              placeholder="Nombre del propietario"
              className="p-1 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md"
              name="ownerName"
              value={ownerName}
              onChange={e => setOwnerName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="ownerPhone" className="text-gray-700 uppercase font-bold">
              Teléfono Propietario
            </label>
            <input
              id="ownerPhone"
              type="text"
              placeholder="Teléfono del propietario"
              className="p-1 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md"
              name="ownerPhone"
              value={ownerPhone}
              onChange={e => setOwnerPhone(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="ownerEmail" className="text-gray-700 uppercase font-bold">
              Email Propietario
            </label>
            <input
              id="ownerEmail"
              type="email"
              placeholder="Email del propietario"
              className="p-1 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md"
              name="ownerEmail"
              value={ownerEmail}
              onChange={e => setOwnerEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="registrationAt" className="text-gray-700 uppercase font-bold">
              Fecha de alta
            </label>
            <input
              id="registrationAt"
              type="date"
              className="p-1 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md"
              name="registrationAt"
              value={registrationAt}
              onChange={e => setRegistrationAt(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="petSymptoms" className="text-gray-700 uppercase font-bold">
              Sintomas de la Mascota
            </label>
            <textarea
              id="petSymptoms"
              rows={7}
              placeholder="Sintomas de la Mascota"
              className="p-1 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md"
              name="petSymptoms"
              value={petSymptoms}
              onChange={e => setPetSymptoms(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="petType" className="text-gray-700 uppercase font-bold">
              Tipo de Mascota
            </label>
            <select
              id="petType"
              placeholder="Tipo de Mascota"
              className="p-1 border-2 border-indigo-600 w-full mt-2 placeholder-gray-400 rounded-md"
              name="petType"
              value={petType}
              onChange={e => setPetType(e.target.value)}
            >
              <option value="">--- Seleccione una opción ---</option>
              <option value="Gato">Gato</option>
              <option value="Perro">Perro</option>
              <option value="Ave">Ave</option>
              <option value="Tortuga">Tortuga</option>
              <option value="Arácnido">Arácnido</option>
              <option value="Reptil">Reptil</option>
            </select>
          </div>
          <Loader loading={loading} />
          <input
            type="submit"
            value="Agregar Paciente"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>
      </div>
    </>
  );
};

export default PatientsForm;
