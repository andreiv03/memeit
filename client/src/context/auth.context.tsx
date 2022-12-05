import { createContext, useEffect, useState } from "react";
import type { User } from "services/users.service";

interface Context {
  callback: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  user: [User, React.Dispatch<React.SetStateAction<User>>];
}

export const userInitialState: User = {
  _id: "",
  email: "",
  username: ""
};

export const AuthContext = createContext<Context>({} as Context);

export const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(userInitialState);

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) return;

    const getAccesToken = async () => {
      try {
        const { authService } = await import("services/auth.service");
        const { data } = await authService.refreshToken();
        setToken(data.accessToken);
        setTimeout(() => getAccesToken, 100 * 60 * 10); // 10 minutes
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };

    getAccesToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const getUser = async () => {
      try {
        const { usersService } = await import("services/users.service");
        const { data } = await usersService.getUser(token);
        setUser(data);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };

    getUser();
  }, [callback, token]);

  const state: Context = {
    callback: [callback, setCallback],
    token: [token, setToken],
    user: [user, setUser]
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
