import clientAxios from "../client";

const checkSession = (token, callback) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const promise = clientAxios("/veterinarians/profile", config);
  promise
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callback(error.response);
    });
};

export default checkSession;
