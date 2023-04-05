import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SchemaUser, UserDocument } from "./schemas/user.schema";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(SchemaUser.name) private userModel: Model<UserDocument>) {
  }

  async findAll(limit: number, page: number, search: string): Promise<[SchemaUser[], number]> {
    const query = this.userModel.find();
    if (search) {
      const regex = new RegExp(`^${search}`, "i");
      query.or([
        { email: { $regex: regex } },
        { password: { $regex: regex } },
        { name: { $regex: regex } },
        { surname: { $regex: regex } },
        { tel: { $regex: regex } },
        { phone_number: { $regex: regex } }
      ]);
    }
    const total = await this.userModel.countDocuments(query);
    const data = await query
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return [data, total];
  }

  async findById(id: string): Promise<SchemaUser> {
    return await this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<SchemaUser> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, userDto: UserDto): Promise<SchemaUser> {
    const userToUpdate: any = {};
    if (userDto.email) {
      userToUpdate.title = userDto.email;
    }
    if (userDto.password) {
      userToUpdate.content = userDto.password;
    }
    if (userDto.banned) {
      userToUpdate.content = userDto.banned;
    }
    if (userDto.admin) {
      userToUpdate.content = userDto.admin;
    }
    if (userDto.name) {
      userToUpdate.content = userDto.name;
    }
    if (userDto.surname) {
      userToUpdate.content = userDto.surname;
    }
    if (userDto.tel) {
      userToUpdate.content = userDto.tel;
    }
    if (userDto.phone_number) {
      userToUpdate.content = userDto.phone_number;
    }
    if (userDto.hasOwnProperty("updated_at")) {
      userToUpdate.updated_at = userDto.updated_at;
    }
    return await this.userModel.findByIdAndUpdate(id, userToUpdate, { new: true }).exec();
  }

  async create(userDto: UserDto): Promise<SchemaUser> {
    const user = new this.userModel(userDto);
    return await user.save();
  }

}
