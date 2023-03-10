import { IsNotEmpty } from "@nestjs/class-validator";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StringBox{

    @Field()
    @IsNotEmpty()
    message : string
}