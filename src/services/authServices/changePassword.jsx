import clientAxios from "../client";

const changePassword = (token, data, callback) => {
  const promise = clientAxios.post(`/veterinarians/change_password/${token}`, data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default changePassword;
