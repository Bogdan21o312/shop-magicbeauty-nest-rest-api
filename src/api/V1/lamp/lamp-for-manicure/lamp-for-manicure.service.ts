import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LampForManicure, LampForManicureDocument,
} from "./schemas/lamp-for-manicure";
import {CreateLampForManicureDto} from "./dto/create-lamp-for-manicure.dto";
import {UpdateLampForManicureDto} from "./dto/update-lamp-for-manicure.dto";

@Injectable()
export class LampForManicureService {
  constructor(@InjectModel(LampForManicure.name) private productModel: Model<LampForManicureDocument>) {
  }

  async getAll(): Promise<LampForManicure[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<LampForManicure> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateLampForManicureDto): Promise<LampForManicure> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<LampForManicure> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateLampForManicureDto): Promise<LampForManicure> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
