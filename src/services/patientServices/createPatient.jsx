import clientAxios from "../client";

const createPatientService = (data, callback) => {
  const promise = clientAxios.post("/patients", data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default createPatientService;
