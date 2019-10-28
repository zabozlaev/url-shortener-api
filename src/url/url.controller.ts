import {
  Controller,
  Get,
  Param,
  Res,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { Response, Request } from 'express';
import { CreateUrlDto } from './dtos/create-url.dto';

@Controller('/')
export class UrlController {
  private readonly logger = new Logger('UrlController');

  constructor(private readonly urlService: UrlService) {}

  @Get('/:ref')
  async getOne(@Param('ref') ref: string, @Res() res: Response) {
    const url = await this.urlService.findOne(ref);

    this.logger.log(`Successfuly redirecting to ${url}`);

    return res.redirect(url);
  }

  @Post('/')
  async create(@Body() body: CreateUrlDto, @Res() req: Request) {
    const addr = req.ip;
    const created = await this.urlService.create(body, addr);

    return created;
  }
}
