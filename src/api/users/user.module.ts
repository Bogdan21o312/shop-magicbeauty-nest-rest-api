import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SchemaUser, UserSchema } from "./schemas/user.schema";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: SchemaUser.name, schema: UserSchema }
    ])
  ]
})
export class UserModule {
}
