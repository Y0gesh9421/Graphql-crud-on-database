
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { EmployeeData } from '../entity/employee.entity';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployee } from '../dto/createEmployee.dto';
import { EditEmployee } from '../dto/editEmployee.dto';
import { PunchInDto } from '../dto/punchIn.dto';
import { InOutData } from '../entity/inOutTime.entity';

@Resolver(of => EmployeeData)
export class EmployeeResolver {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService) {}
    
  @Query(() => EmployeeData)
  async showEmployee(@Args('id') id: string): Promise<EmployeeData> {
    return await this.employeeService.showEmployee(id);
  }

  @Query(() => [EmployeeData])
  async showAllEmp(): Promise<EmployeeData[]> {
    return await this.employeeService.showAllEmployee();
  }

  @Mutation(() => EmployeeData)
  async createEmployee (@Args('data') data: CreateEmployee):Promise<CreateEmployee> {
      return this.employeeService.createEmployee(data)
  }

  @Mutation(() => EmployeeData)
  async editEmployee (@Args('id')id:string,@Args('data')data:EditEmployee):Promise<CreateEmployee>{
    return this.employeeService.editEmployee(id,data)
  }

  @Mutation(() => Boolean)
  async deleteEmployee(@Args('id')id:string):Promise<Boolean>{
    return this.employeeService.deleteEmployee(id)
  } 
    
  @Mutation(() => PunchInDto)
  async punchIn(@Args('id')id:string):Promise<PunchInDto>{
    return this.employeeService.punchIn(id)
  }

  @Mutation(() => InOutData)
  async punchOut(@Args('id')id:string):Promise<InOutData>{
    return this.employeeService.punchOut(id)
  }

}