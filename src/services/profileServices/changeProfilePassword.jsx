import clientAxios from "../client";

const changeProfilePasswordService = (data, callback) => {
  const promise = clientAxios.put(`/veterinarians/profile/change_profile_password`, data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default changeProfilePasswordService;
