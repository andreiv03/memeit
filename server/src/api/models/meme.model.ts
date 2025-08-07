import { model, Document, Schema, Types } from "mongoose";

export interface IMeme extends Document {
  description: string;
  image: {
    publicId: string;
    url: string;
  };
  userId: Types.ObjectId;
}

const MemeSchema = new Schema<IMeme>(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      publicId: {
        type: String,
        required: true,
        trim: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Meme = model<IMeme>("Meme", MemeSchema);
