import { Schema } from 'mongoose';

export const urlSchema = new Schema(
  {
    source: String,
    ref: { type: String, index: { unique: true } },
    creatorIp: String,
  },
  { timestamps: { createdAt: true } },
);
