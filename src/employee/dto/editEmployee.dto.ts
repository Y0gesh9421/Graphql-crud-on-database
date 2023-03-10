import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, max, MaxLength, MinLength } from "@nestjs/class-validator"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class EditEmployee{

    @Field()
    @IsString()
    @IsOptional()
    name?:string

    @Field()
    @IsOptional()
    @MaxLength(10)
    @MinLength(10)
    mobNo?:string

    @Field()
    @IsString()
    @IsOptional()
    address?:string

    @Field()
    @IsEmail()
    @IsOptional()
    email?:string
    
}