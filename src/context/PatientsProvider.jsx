import { createContext, useEffect, useState } from "react";
import getPatientsService from "../services/patientServices/getPatients";
import notify from "../components/utils/notify";
import deletePatientService from "../services/patientServices/deletePatient";
import useAuth from "./../hooks/useAuth";

const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patientEditing, setPatientEditing] = useState({});

  const { auth } = useAuth();

  useEffect(() => {
    const getAllPatients = () => {
      try {
        getPatientsService(response => {
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
  }, [auth]);

  const savePatient = patient => {
    setPatients([...patients, patient]);
  };

  const updatePatientsState = (id, patient) => {
    const updatedPatients = patients.map(patientMap => (patientMap._id === id ? patient : patientMap));
    setPatients([...updatedPatients]);
  };

  const deletePatient = id => {
    const confirmed = confirm("Estás seguro que desea eliminar este paciente?");

    if (confirmed) {
      deletePatientService(id, response => {
        if (response.status === 200) {
          notify(response.data.msg, "success");
          const updatedPatients = patients.filter(patient => patient._id !== id);
          setPatients([...updatedPatients]);
        }
      });
    }
  };

  return (
    <PatientsContext.Provider
      value={{ patients, savePatient, patientEditing, setPatientEditing, updatePatientsState, deletePatient }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsProvider };

export default PatientsContext;
