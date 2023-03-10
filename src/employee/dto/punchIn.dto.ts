import { IsNotEmpty } from "@nestjs/class-validator";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { EmployeeData } from "../entity/employee.entity";

@ObjectType()
export class PunchInDto{
    
    @Field()
    id:String

    @Field()
    punchIn:string

    @Field()
    punchOut?:string

    @Field()
    employeeData: EmployeeData
}