export interface Meme {
  _id: string;
  description: string;
  image: {
    publicId: string;
    url: string;
  };
  userId: string;
}

export interface GetMemesResponse {
  message: string;
  memes: Meme[];
}

export interface UploadMemeFormData {
  userId: string;
  description: string;
  image: string;
}

export interface UploadMemeResponse {
  message: string;
  meme: Meme;
}
