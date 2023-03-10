import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeData } from "./employee.entity";

@ObjectType()
@Entity()
export class InOutData{

    @Field()
    @PrimaryGeneratedColumn()
    id:string

    @Field()
    @Column({ nullable: true})
    punchIn:string

    @Field()
    @Column({ nullable: true})
    punchOut?:string

    @ManyToOne(() => EmployeeData, (employeeData) => employeeData.inOutData,{ cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    employeeData: EmployeeData
    
}