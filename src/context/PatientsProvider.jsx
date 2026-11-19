import { createContext, useEffect, useState } from "react";
import getPatients from "../services/patientServices/getPatients";
import notify from "../components/utils/notify";

const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patientEditing, setPatientEditing] = useState({});

  useEffect(() => {
    const getAllPatients = () => {
      try {
        getPatients(response => {
          if (response.status === 200) {
            setPatients([...response.data.patients]);
          } else {
            notify("Hubo un error al obtener los pacientes!", "error");
          }
        });
      } catch (error) {
        notify(error.msg, "error");
      }
    };

    getAllPatients();
  }, []);

  const savePatient = patient => {
    setPatients([...patients, patient]);
  };

  const updatePatientsState = (id, patient) => {
    const updatedPatients = patients.map(patientMap => (patientMap._id === id ? patient : patientMap));
    setPatients([...updatedPatients]);
  };

  return (
    <PatientsContext.Provider value={{ patients, savePatient, patientEditing, setPatientEditing, updatePatientsState }}>
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsProvider };

export default PatientsContext;
