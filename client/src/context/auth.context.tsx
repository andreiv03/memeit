import { createContext, useContext, useEffect, useState } from "react";

import { useLayoutContext } from "context/layout.context";
import type { User } from "services/users.service";

interface AuthContext {
  callback: boolean;
  setCallback: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleAuth: (formData: AuthFormData) => void;
  handleLogout: () => void;
}

interface AuthContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface AuthFormData {
  email: string;
  password: string;
  username: string;
}

const userInitialState: User = {
  _id: "",
  email: "",
  username: ""
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("Something went wrong with the React Context API!");
  return authContext;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(userInitialState);

  const layoutContext = useLayoutContext();

  const handleAuth = async (formData: AuthFormData) => {
    const { authService } = await import("services/auth.service");

    if (layoutContext.menuType === "LOGIN") {
      const { data } = await authService.login(formData);
      setToken(data.accessToken);
    }

    if (layoutContext.menuType === "REGISTER") {
      const { data } = await authService.register(formData);
      setToken(data.accessToken);
    }
  };

  const handleLogout = async () => {
    const { authService } = await import("services/auth.service");
    await authService.logout();
    setToken("");
    setUser(userInitialState);
    localStorage.removeItem("authenticated");
  };

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated)
      return layoutContext.Animation.isMounted
        ? layoutContext.Animation.handleStopAnimation()
        : undefined;

    const getAccesToken = async () => {
      try {
        const { authService } = await import("services/auth.service");
        const { data } = await authService.refreshToken();
        setToken(data.accessToken);
        setTimeout(() => getAccesToken, 100 * 60 * 10); // 10 minutes
      } catch (error: any) {
        if (layoutContext.Animation.isMounted) layoutContext.Animation.handleStopAnimation();
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
        if (layoutContext.Animation.isMounted) layoutContext.Animation.handleStopAnimation();
      } catch (error: any) {
        if (layoutContext.Animation.isMounted) layoutContext.Animation.handleStopAnimation();
        alert(error.response.data.message);
      }
    };

    getUser();
  }, [callback, token]);

  const state: AuthContext = {
    callback,
    setCallback,
    token,
    setToken,
    user,
    setUser,
    handleAuth,
    handleLogout
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
