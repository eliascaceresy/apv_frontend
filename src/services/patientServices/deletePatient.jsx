import clientAxios from "../client";

const deletePatientService = (id, callback) => {
  const promise = clientAxios.delete(`/patients/${id}`);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default deletePatientService;
