import clientAxios from "../client";

const login = (data, callback) => {
  const promise = clientAxios.post("/veterinarians/login", data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default login;
