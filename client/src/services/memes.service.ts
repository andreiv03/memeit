import axios from "utils/axios";

export interface Meme {
  _id: string;
  description: string;
  userId: string;
}

interface Response {
  _id: string;
}

interface FormData {
  description: string;
}

class MemesService {
  getMemes() {
    return axios.get<Meme[]>("/memes");
  }

  createMeme(accessToken: string, formData: FormData) {
    return axios.post<Response>("/memes", formData, {
      headers: { authorization: accessToken }
    });
  }

  getMeme(id: string) {
    return axios.get<Meme>(`/memes/${id}`);
  }

  updateMeme(accessToken: string, id: string, formData: FormData) {
    return axios.patch<Response>(`/memes/${id}`, formData, {
      headers: { authorization: accessToken }
    });
  }

  deleteMeme(accessToken: string, id: string) {
    return axios.delete<Response>(`/memes/${id}`, {
      headers: { authorization: accessToken }
    });
  }
}

export const memesService = new MemesService();
