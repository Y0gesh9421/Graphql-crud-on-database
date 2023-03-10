import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeResolver } from '../resolver/employee.resolver';
import { EmployeeService } from '../service/employee.service';
import { EmployeeData } from '../entity/employee.entity';
import { InOutData } from '../entity/inOutTime.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([EmployeeData]) ,
                TypeOrmModule.forFeature([InOutData]),
                Repository,],
    providers: [ EmployeeResolver, EmployeeService ]})
export class EmployeeModule {}
