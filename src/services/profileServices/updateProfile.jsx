import clientAxios from "../client";

const updateProfileService = (id, data, callback) => {
  const promise = clientAxios.put(`/veterinarians/profile/${id}`, data);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default updateProfileService;
