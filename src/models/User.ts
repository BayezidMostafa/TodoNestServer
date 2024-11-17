// src/models/User.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  role:
    | "designer"
    | "developer"
    | "digitalMarketing"
    | "contentCreator"
    | "projectManager"
    | "admin";
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  tickets: mongoose.Types.ObjectId[]; // Project IDs the user is part of
  avatarUrl?: string;
  bio?: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: [
        "designer",
        "developer",
        "digitalMarketing",
        "contentCreator",
        "projectManager",
        "admin",
      ],
      default: "developer",
    },

    // Password reset fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    // Tickets the user is associated with
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tickets" }],

    // Optional profile information
    avatarUrl: { type: String },
    bio: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
