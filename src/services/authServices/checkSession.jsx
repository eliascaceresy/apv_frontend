import clientAxios from "../client";

const checkSession = () => clientAxios.get("/veterinarians/profile");

export default checkSession;
