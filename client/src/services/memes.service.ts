import type { MemesFormData } from "context/memes.context";
import axios from "utils/axios";

export interface Meme {
  _id: string;
  description: string;
  image: {
    publicId: string;
    url: string;
  };
  userId: string;
}

interface Response {
  _id: string;
}

class MemesService {
  getMemes() {
    return axios.get<Meme[]>("/memes");
  }

  createMeme(accessToken: string, formData: MemesFormData) {
    return axios.post<Response>("/memes", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  getMeme(id: string) {
    return axios.get<Meme>(`/memes/${id}`);
  }

  updateMeme(accessToken: string, id: string, formData: MemesFormData) {
    return axios.patch<Response>(`/memes/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  deleteMeme(accessToken: string, id: string) {
    return axios.delete<Response>(`/memes/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}

export const memesService = new MemesService();
