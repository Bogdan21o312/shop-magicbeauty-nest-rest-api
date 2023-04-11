import {Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SchemaUser, UserSchema } from "./schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

@Module({
  providers: [UserService, AuthService],
  controllers: [UserController],
  imports: [
    JwtModule.register({ secret: 'your_secret_key' }),
    MongooseModule.forFeature([{
      name: SchemaUser.name,
      schema: UserSchema
    }])
  ],
  exports: [
    UserService
  ]
})
export class UserModule {
}
