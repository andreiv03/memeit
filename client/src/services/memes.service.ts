import axios from "utils/axios";

export interface Meme {
  _id: string;
  description: string;
  userId: string;
}

interface FormData {
  description: string;
}

class MemesService {
  getMemes() {
    return axios.get<Meme[]>("/memes");
  }

  createMeme(accessToken: string, formData: FormData) {
    return axios.post<{ _id: string }>("/memes", formData, {
      headers: { authorization: accessToken }
    });
  }

  getMeme(id: string) {
    return axios.get<Meme>(`/memes/${id}`);
  }

  updateMeme(accessToken: string, id: string, formData: FormData) {
    return axios.patch<{ _id: string }>(`/memes/${id}`, formData, {
      headers: { authorization: accessToken }
    });
  }

  deleteMeme(accessToken: string, id: string) {
    return axios.delete<{ _id: string }>(`/memes/${id}`, {
      headers: { authorization: accessToken }
    });
  }
}

export const memesService = new MemesService();
