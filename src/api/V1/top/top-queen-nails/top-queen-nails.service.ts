import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {TopQueenNails, TopQueenNailsDocument} from "./schemas/top-queen-nails";
import {CreateTopQueenNailsDto} from "./dto/create-top-queen-nails.dto";
import {UpdateTopQueenNailsDto} from "./dto/update-top-queen-nails.dto";

@Injectable()
export class TopQueenNailsService {
  constructor(@InjectModel(TopQueenNails.name) private productModel: Model<TopQueenNailsDocument>) {
  }

  async getAll(): Promise<TopQueenNails[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<TopQueenNails> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateTopQueenNailsDto): Promise<TopQueenNails> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<TopQueenNails> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateTopQueenNailsDto): Promise<TopQueenNails> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
