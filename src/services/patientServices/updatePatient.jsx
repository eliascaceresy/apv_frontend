import clientAxios from "../client";

const updatePatientService = (id, data, callback) => {
  const promise = clientAxios.put(`/patients/${id}`, data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default updatePatientService;
