import clientAxios from "../client";

const getPatientsService = callback => {
  const promise = clientAxios.get("/patients");
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default getPatientsService;
