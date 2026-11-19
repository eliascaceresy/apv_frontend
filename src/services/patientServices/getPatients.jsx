import clientAxios from "../client";

const getPatients = callback => {
  const promise = clientAxios.get("/patients");
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default getPatients;
