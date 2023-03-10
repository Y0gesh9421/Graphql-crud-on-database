import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import * as _ from 'lodash';
import {  MoreThan, Repository } from 'typeorm';
import { CreateEmployee } from '../dto/createEmployee.dto';
import { EditEmployee } from '../dto/editEmployee.dto';
import { PunchInDto } from '../dto/punchIn.dto';
import { EmployeeData } from '../entity/employee.entity';
import { InOutData } from '../entity/inOutTime.entity';

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(EmployeeData) private readonly employeeRepository: Repository<EmployeeData>,
                @InjectRepository(InOutData) private readonly inOutRepository: Repository<InOutData>) {}

    async createEmployee(data: CreateEmployee): Promise<EmployeeData> {
        try{
            const newEmp = await this.employeeRepository.save(data);
            return newEmp;
        }
        catch(error){
            return error;
        }
    }

    async editEmployee(eid: string, data: EditEmployee): Promise<EmployeeData> {
        try{
            const check = await this.employeeRepository.findOneById(eid);
            if(check){
                const editEmp = await this.employeeRepository.update(eid, data);
                const updEmp = await this.employeeRepository.findOneById(eid);
                return updEmp;
            }
            else{
                throw new Error('Invalid employee id');
            }
           
        }
        catch(error){
            return error;
        }
    }

    async deleteEmployee(did: string): Promise<boolean> {
        try{
            const avail = await this.employeeRepository.findOneById(did);
            if (avail) {
                this.employeeRepository.delete(did);
                return true;
            }
            else {
                throw Error("Invalid Employee id");
            }
        }
        catch(error){
            return error;
        }

    }

    async showEmployee(sid: string): Promise<EmployeeData> {
        try{
            const getEmp = await this.employeeRepository.findOneById(sid);
            if(getEmp){
                return getEmp;
            }
            else{
                throw Error("Invalid Employee id");
            } 
        }
        catch(error){
            return error;
        }
    }

    async showAllEmployee(): Promise<EmployeeData[]> {
        try{
            const allEmp = await this.employeeRepository.find();
            if(allEmp){
                return allEmp;
            }
            else{
                throw Error("No Employee registered");
            }   
        }
        catch(error){
            return error;
        }
    }

    async punchIn(id: string): Promise<PunchInDto> {
        try{
            const exist = await this.employeeRepository.findOneById(id);
            if(exist){
                const date = moment().startOf('day').format();
                const punchCount = await this.inOutRepository.find({
                    where: {
                        punchIn: MoreThan(date),
                        employeeData: { id: id }
                        },
                    relations: ['employeeData'],
                    });
                if (punchCount.length === 0) {
                    const inTime = moment().format();
                    const empDetails = await this.employeeRepository.findOneBy({ id: id });
                    const inDetails = new InOutData();
                    inDetails.punchIn = inTime;
                    inDetails.punchOut = null;
                    inDetails.employeeData = empDetails;
                    const punchDb = await this.inOutRepository.save(inDetails);
                    const rid = punchDb.id.toString();
                    const data = await this.inOutRepository.findOneById(rid);
                    return data;
                }
                return punchCount[0];
            }
            else{
                throw Error("Employee do not exist");
            }  
        }
        catch(error){
            return error;
        }
    }

    async punchOut(id: string): Promise<InOutData> {
        const exist = await this.employeeRepository.findOneById(id);
        if(exist){
            const empDetail = await this.employeeRepository.findOne({
                where: {
                    id: id,
                },
                relations: ['inOutData'],
            });
            console.log(empDetail)
            if(empDetail.inOutData.length === 0){
                throw Error("Not punched in")
            }
            else{
                if(empDetail.inOutData[0].punchOut === null){
                    const outTime =  moment().format();
                    const date = moment().startOf('day').format();
                    const punch = await this.inOutRepository.findOne({
                        where: {
                            employeeData: { id: id },
                            punchIn: MoreThan(date)
                        }
                    })
                    punch.punchOut = outTime;
                    return await this.inOutRepository.save(punch);
                }
                return empDetail.inOutData[0];
            }  
        }
        else{
            throw Error("Employee do not exist");
        }
    }
}
