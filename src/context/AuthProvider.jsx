import { useState, useEffect, createContext } from "react";
import checkSession from "../services/authServices/checkSession";

const AuthContext = createContext();

const AuthProvider = props => {
  const { children } = props;

  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authenticateUser = () => {
      const token = localStorage.getItem("session");

      if (!token) return;

      checkSession(token, response => {
        if (response.status === 200) {
          setAuth(response.data);
        } else {
          setAuth({});
        }
      });
    };

    authenticateUser();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };

export default AuthContext;
