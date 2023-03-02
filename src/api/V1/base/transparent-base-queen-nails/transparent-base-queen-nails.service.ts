import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {TransparentBaseQueenNails, TransparentBaseQueenNailsDocument} from "./schemas/transparent-base-queen-nails";
import {CreateTransparentBaseQueenNailsDto} from "./dto/create-transparent-base-queen-nails.dto";
import {UpdateTransparentBaseQueenNailsDto} from "./dto/update-transparent-base-queen-nails.dto";

@Injectable()
export class TransparentBaseQueenNailsService {
  constructor(@InjectModel(TransparentBaseQueenNails.name) private productModel: Model<TransparentBaseQueenNailsDocument>) {
  }

  async getAll(): Promise<TransparentBaseQueenNails[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<TransparentBaseQueenNails> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateTransparentBaseQueenNailsDto): Promise<TransparentBaseQueenNails> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<TransparentBaseQueenNails> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateTransparentBaseQueenNailsDto): Promise<TransparentBaseQueenNails> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
