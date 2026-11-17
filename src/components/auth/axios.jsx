import axios from "axios";

const urlBase = "http://localhost:4000/api/veterinarians";

const createAccount = (data, callback) => {
  const url = `${urlBase}/register`;
  const promise = axios.post(url, data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export { createAccount };
