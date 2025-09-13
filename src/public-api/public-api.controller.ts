import { Controller, Get, Query } from '@nestjs/common';
import { PublicApiService } from './public-api.service';

@Controller('public-api')
export class PublicApiController {

    constructor(
        private readonly publicApiService: PublicApiService
    ) {}

    @Get()
    getPublicApiResponse(@Query('key') key: string ): object {
        return this.publicApiService.getResponse(key);
    }
}
