import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicApi } from './public-api';
import { Repository } from 'typeorm';

@Injectable()
export class PublicApiService {

    constructor(
        @InjectRepository(PublicApi)
        private readonly publicApiRepository: Repository<PublicApi>,
    ) { }

    async getResponse(key: string): Promise<object> {
        try {
            if (!key) {
                throw new BadRequestException('Key must be provided');
            }
            const response = await this.publicApiRepository.findOne({ where: { key: key } });
            if(response === null || response === undefined)
                throw new NotFoundException('Key not found');
            else
                return response.response;
        } catch (error) {
            throw error;
        } 
    }
}
