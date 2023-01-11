import mongoose from "mongoose";

export interface Meme {
  _id: string;
  description: string;
  image: {
    publicId: string;
    url: string;
  };
  userId: string;
}

const options: mongoose.SchemaOptions = {
  timestamps: true
};

const schema = new mongoose.Schema<Meme>(
  {
    description: {
      required: true,
      trim: true,
      type: String
    },
    image: {
      publicId: {
        required: true,
        trim: true,
        type: String
      },
      url: {
        required: true,
        trim: true,
        type: String
      }
    },
    userId: {
      required: true,
      trim: true,
      type: String
    }
  },
  options
);

export const MemesModel = mongoose.model<Meme>("Memes", schema);
