import clientAxios from "../client";

const updatePatient = (id, data, callback) => {
  const promise = clientAxios.put(`/patients/${id}`, data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default updatePatient;
