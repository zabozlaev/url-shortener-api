import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { randomBytes } from 'crypto';

import { IUrl } from './interfaces/url.interface';
import { CreateUrlDto } from './dtos/create-url.dto';

@Injectable()
export class UrlService {
  private readonly logger = new Logger('UrlService');

  constructor(
    @Inject('URL_MODEL')
    private readonly urlModel: Model<IUrl>,
  ) {}

  async create({ source }: CreateUrlDto, creatorIp: string | number) {
    const urlsCreated = await this.urlModel.count({
      creatorIp,
    });

    if (urlsCreated > 30) {
      this.logger.log('Url limit per ip reached');

      await this.urlModel.deleteMany({
        creatorIp,
      });
    }

    const ref = randomBytes(4).toString('hex');

    this.logger.log(`Creating url with ref: ${ref}`);

    return this.urlModel.create({
      source,
      creatorIp,
      ref,
    });
  }

  async findOne(ref: string): Promise<string> {
    const urlFound = await this.urlModel.findOne({
      ref,
    });

    if (!urlFound) {
      this.logger.warn('Url ref was not in any document');

      throw new HttpException(
        'This link does not refer to any page',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.urlModel.deleteOne({
      _id: urlFound._id,
    });

    return urlFound.source;
  }
}
