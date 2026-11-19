import { format } from "date-fns";
import usePatients from "../../hooks/usePatients";

const Patient = ({ patient }) => {
  const { petName, ownerName, ownerEmail, ownerPhone, petSymptoms, petType, registrationAt, _id } = patient;

  const { setPatientEditing } = usePatients();

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-600 my-2">
        Nombre Mascota: <span className="font-normal normal-case text-black">{petName}</span>
      </p>
      <p className="font-bold uppercase text-indigo-600 my-2">
        Propietario: <span className="font-normal normal-case text-black">{ownerName}</span>
      </p>
      <p className="font-bold uppercase text-indigo-600 my-2">
        Teléfono: <span className="font-normal normal-case text-black">{ownerPhone}</span>
      </p>
      <p className="font-bold uppercase text-indigo-600 my-2">
        Email: <span className="font-normal normal-case text-black">{ownerEmail}</span>
      </p>
      <p className="font-bold uppercase text-indigo-600 my-2">
        Síntomas: <span className="font-normal normal-case text-black">{petSymptoms}</span>
      </p>
      <p className="font-bold uppercase text-indigo-600 my-2">
        Tipo de Mascota: <span className="font-normal normal-case text-black">{petType}</span>
      </p>
      <p className="font-bold uppercase text-indigo-600 my-2">
        Fecha de Alta:{" "}
        <span className="font-normal normal-case text-black">{format(registrationAt, "dd/MM/yyyy")}</span>
      </p>
      <div className="flex justify-between my-5">
        <button
          type="button"
          className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg hover:cursor-pointer"
          onClick={() => setPatientEditing(patient)}
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg hover:cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Patient;
