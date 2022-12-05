import axios from "utils/axios";

interface LoginFormData {
  password: string;
  username: string;
}

interface RegisterFormData {
  email: string;
  password: string;
  username: string;
}

class AuthService {
  login(formData: LoginFormData) {
    return axios.post<{ accessToken: string }>("/auth/login", formData);
  }

  logout() {
    return axios.get<null>("/auth/logout");
  }

  refreshToken() {
    return axios.get<{ accessToken: string }>("/auth/refresh-token");
  }

  register(formData: RegisterFormData) {
    return axios.post<{ accessToken: string }>("/auth/register", formData);
  }
}

export const authService = new AuthService();
