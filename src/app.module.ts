import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UrlModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
