import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InOutData } from "./inOutTime.entity";

@ObjectType()
@Entity()
export class EmployeeData {

    @Field()
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    mobNo: string

    @Field()
    @Column()
    address: string

    @Field()
    @Column()
    email: string

    @OneToMany(() => InOutData, (inOutData) => inOutData.employeeData)
    inOutData: InOutData[]

}