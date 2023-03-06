import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CreateUsersDto} from "./dto/create-users.dto";
import {UpdateUsersDto} from "./dto/update-users.dto";
import {Users, UsersDocument} from "./schemas/users";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private productModel: Model<UsersDocument>) {
  }

  async getAll(): Promise<Users[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<Users> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateUsersDto): Promise<Users> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<Users> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateUsersDto): Promise<Users> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
