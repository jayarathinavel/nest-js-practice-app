import { Module } from '@nestjs/common';
import { PublicApiController } from './public-api.controller';
import { PublicApiService } from './public-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicApi } from './public-api';

@Module({
  imports: [TypeOrmModule.forFeature([PublicApi])],
  controllers: [PublicApiController],
  providers: [PublicApiService]
})
export class PublicApiModule {}
