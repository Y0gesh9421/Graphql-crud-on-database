import { IsEmail, IsNotEmpty, IsNumber, IsString, max, MaxLength, MinLength } from "@nestjs/class-validator"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreateEmployee{

    @Field()
    @IsString()
    @IsNotEmpty()
    name:string

    @Field()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(10)
    mobNo:string

    @Field()
    @IsString()
    address:string

    @Field()
    @IsEmail()
    email:string
    
}