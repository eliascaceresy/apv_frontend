import clientAxios from "../client";

const createAccount = (data, callback) => {
  const promise = clientAxios.post("/veterinarians/register", data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default createAccount;
