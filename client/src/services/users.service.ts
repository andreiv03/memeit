import axios from "utils/axios";

export interface User {
  _id: string;
  email: string;
  username: string;
}

class UsersService {
  getUser(accessToken: string) {
    return axios.get<User>("/users/user", {
      headers: { authorization: accessToken }
    });
  }
}

export const usersService = new UsersService();
