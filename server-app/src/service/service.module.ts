import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Service from './service.entity';

@Module({
  providers: [ServiceService],
  controllers: [ServiceController],
  imports: [TypeOrmModule.forFeature([Service])]
})
export class ServiceModule {}
