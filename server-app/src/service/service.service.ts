import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Service from './service.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Service)
        private serviceRepo: Repository<Service>,
    ) {}

    async addService(service: Service) {
        return await this.serviceRepo.save(service)
    }

    async getServicesLikeDesc() {
        return await this.serviceRepo.find()
    }
}
