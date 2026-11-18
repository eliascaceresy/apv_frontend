import { useState, useEffect, createContext } from "react";
import checkSession from "../services/authServices/checkSession";

const AuthContext = createContext();

const AuthProvider = props => {
  const { children } = props;

  const [auth, setAuth] = useState({});
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const authenticateUser = () => {
      const token = localStorage.getItem("session");

      if (!token) {
        setLoadingAuth(false);
        return;
      }

      checkSession(token, response => {
        if (response.status === 200) {
          setAuth(response.data);
          setLoadingAuth(false);
        } else {
          setAuth({});
          setLoadingAuth(false);
        }
      });
    };

    authenticateUser();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth, loadingAuth }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };

export default AuthContext;
