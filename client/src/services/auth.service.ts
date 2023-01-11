import { type FormData } from "context/auth.context";
import axios from "utils/axios";

interface Response {
  accessToken: string;
}

class AuthService {
  login(formData: FormData) {
    return axios.post<Response>("/auth/login", formData);
  }

  logout() {
    return axios.get<null>("/auth/logout");
  }

  refreshToken() {
    return axios.get<Response>("/auth/refresh-token");
  }

  register(formData: FormData) {
    return axios.post<Response>("/auth/register", formData);
  }
}

export const authService = new AuthService();
