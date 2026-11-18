import clientAxios from "../client";

const login = data => clientAxios.post("/veterinarians/login", data);

export default login;
