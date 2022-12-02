import mongoose from "mongoose";

export interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
}

const options: mongoose.SchemaOptions = {
  timestamps: true
};

const schema = new mongoose.Schema<User>(
  {
    email: {
      required: true,
      trim: true,
      type: String,
      unique: true
    },
    password: {
      required: true,
      trim: true,
      type: String
    },
    username: {
      required: true,
      trim: true,
      type: String,
      unique: true
    }
  },
  options
);

export const UsersModel = mongoose.model<User>("Users", schema);
