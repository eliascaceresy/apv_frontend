import clientAxios from "../client";

const forgetPassword = (data, callback) => {
  const promise = clientAxios.post("/veterinarians/forget_password", data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default forgetPassword;
