import clientAxios from "../client";

const checkTokenChangePassword = (token, callback) => {
  const promise = clientAxios.get(`/veterinarians/check_token_change_password/${token}`);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default checkTokenChangePassword;
