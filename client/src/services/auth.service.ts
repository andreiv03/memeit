import axios from "utils/axios";

interface Response {
  accessToken: string;
}

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
    return axios.post<Response>("/auth/login", formData);
  }

  logout() {
    return axios.get<null>("/auth/logout");
  }

  refreshToken() {
    return axios.get<Response>("/auth/refresh-token");
  }

  register(formData: RegisterFormData) {
    return axios.post<Response>("/auth/register", formData);
  }
}

export const authService = new AuthService();
