import clientAxios from "../client";

const confirmAccount = (token, callback) => {
  const promise = clientAxios.post(`/veterinarians/confirm_account/${token}`);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default confirmAccount;
