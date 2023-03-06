import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {Users, UsersSchema} from "./schemas/users";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      {name: Users.name, schema: UsersSchema}
    ])
  ]
})
export class UsersModule {
}
