import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/module/employee.module';
import { EmployeeData } from './employee/entity/employee.entity';
import { InOutData } from './employee/entity/inOutTime.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: true,
      }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'insert_password',
      database: 'PunchApp',
      entities: [EmployeeData,InOutData ] ,
      synchronize: true,
    }),
    EmployeeModule  ],
})
export class AppModule {}
