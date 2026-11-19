import React from "react";
import usePatients from "../../hooks/usePatients";
import Patient from "./Patient";

const PatientsIndex = () => {
  const { patients } = usePatients();

  return (
    <>
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tu <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {patients.map(patient => {
            return <Patient patient={patient} key={patient._id} />;
          })}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
          </p>
        </>
      )}
    </>
  );
};

export default PatientsIndex;
