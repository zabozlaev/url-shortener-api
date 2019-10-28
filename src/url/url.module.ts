import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { DatabaseModule } from 'src/database/database.module';
import { urlProvider } from './url.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UrlController],
  providers: [UrlService, urlProvider],
})
export class UrlModule {}
