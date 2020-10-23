import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ServiceService } from './service.service';
import Service from './service.entity';

@Controller('service')
export class ServiceController {

    constructor(
        readonly serviceService: ServiceService 
    ) {}

    @Get()
    async getServicesByLikeName() {
        return await this.serviceService.getServicesLikeDesc()
    }

    @Post()
    async addService(@Body() service: Service) {
        return await this.serviceService.addService(service)
    }
}
