import { Connection } from 'mongoose';
import { Provider } from '@nestjs/common';

import { urlSchema } from './schemas/url.schema';

export const urlProvider: Provider = {
  provide: 'URL_MODEL',
  useFactory: (connection: Connection) => connection.model('Url', urlSchema),
  inject: ['MONGODB_CONNECTION'],
};
