import { Document } from 'mongoose';

export interface IUrl extends Document {
  readonly source: string;
  readonly ref: string;
  readonly createdAt: string;
}
