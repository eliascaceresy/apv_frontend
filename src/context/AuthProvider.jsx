import { createContext, useCallback, useEffect, useRef, useState } from "react";
import checkSession from "../services/authServices/checkSession";
import notify from "../components/utils/notify";
import updateProfileService from "../services/profileServices/updateProfile";
import changeProfilePasswordService from "../services/profileServices/changeProfilePassword";

const AuthContext = createContext();

const AuthProvider = props => {
  const { children } = props;

  const [auth, setAuth] = useState(null);
  const [status, setStatus] = useState("checking");
  const sessionRequestId = useRef(0);

  const updateProfile = (id, data) => {
    try {
      updateProfileService(id, data, response => {
        console.log(response);

        if (response.status === 200) {
          setAuth({ profile: response.data.veterinarian });
          notify("Perfil actualizado exitosamente!", "success");
        } else {
          notify(response.data.msg, "error");
        }
      });
    } catch (error) {
      notify(error, "error");
    }
  };

  const logout = useCallback(() => {
    sessionRequestId.current += 1;
    localStorage.removeItem("session");
    setAuth(null);
    setStatus("unauthenticated");
  }, []);

  const loadSession = useCallback(async () => {
    const requestId = ++sessionRequestId.current;

    if (!localStorage.getItem("session")) {
      setAuth(null);
      setStatus("unauthenticated");
      return false;
    }

    setStatus("checking");

    try {
      const response = await checkSession();

      if (requestId !== sessionRequestId.current) {
        return false;
      }

      setAuth(response.data);
      setStatus("authenticated");
      return true;
    } catch (error) {
      if (requestId !== sessionRequestId.current) {
        return false;
      }

      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
      } else {
        setStatus("error");
      }

      return false;
    }
  }, [logout]);

  const login = useCallback(
    async token => {
      localStorage.setItem("session", token);

      const authenticated = await loadSession();
      if (!authenticated) {
        throw new Error("No se pudo verificar la sesión.");
      }
    },
    [loadSession],
  );

  useEffect(() => {
    loadSession();
    return () => {
      sessionRequestId.current += 1;
    };
  }, [loadSession]);

  useEffect(() => {
    window.addEventListener("auth:session-expired", logout);
    return () => window.removeEventListener("auth:session-expired", logout);
  }, [logout]);

  const changeProfilePassword = (data, callback) => {
    try {
      changeProfilePasswordService(data, response => {
        if (response.status === 200) {
          notify(response.data.msg, "success");
          callback(response);
        } else {
          notify(response.data.msg, "error");
        }
      });
    } catch (error) {
      notify(error, "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, status, login, logout, retrySession: loadSession, updateProfile, changeProfilePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
