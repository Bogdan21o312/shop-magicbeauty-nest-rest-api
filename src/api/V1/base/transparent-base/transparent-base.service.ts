import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {TransparentBase, TransparentBaseDocument} from "./schemas/transparent-base";
import {CreateTransparentBaseDto} from "./dto/create-transparent-base.dto";
import {UpdateTransparentBaseDto} from "./dto/update-transparent-base.dto";

@Injectable()
export class TransparentBaseService {
  constructor(@InjectModel(TransparentBase.name) private productModel: Model<TransparentBaseDocument>) {
  }

  async getAll(): Promise<TransparentBase[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<TransparentBase> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateTransparentBaseDto): Promise<TransparentBase> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<TransparentBase> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateTransparentBaseDto): Promise<TransparentBase> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
