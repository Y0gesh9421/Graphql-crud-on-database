import { IsNotEmpty } from "@nestjs/class-validator";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PunchOutDto{

    @Field()
    @IsNotEmpty()
    id:string

    @Field()
    @IsNotEmpty()
    punchIn:string
    
    @Field()
    @IsNotEmpty()
    punchOut:string

}