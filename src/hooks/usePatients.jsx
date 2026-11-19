import { useContext } from "react";
import PatientsContext from "../context/PatientsProvider";

const usePatients = () => {
  const context = useContext(PatientsContext);

  if (!context) {
    throw new Error("usePatients debe usarse dentro de PatientsProvider.");
  }

  return context;
};

export default usePatients;
