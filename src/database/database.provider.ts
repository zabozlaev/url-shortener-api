import * as mongoose from 'mongoose';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
  {
    provide: 'MONGODB_CONNECTION',
    useFactory: async () =>
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      }),
  },
];
