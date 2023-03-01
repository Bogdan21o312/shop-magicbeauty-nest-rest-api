import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GelPolishesQueenNails,
  GelPolishesQueenNailsDocument
} from "./schemas/gel-polishes-queen-nails";
import {CreateGelPolishesQueenNailsDto} from "./dto/create-gel-polishes-queen-nails.dto";
import {UpdateGelPolishesQueenNailsDto} from "./dto/update-gel-polishes-queen-nails.dto";

@Injectable()
export class GelPolishesQueenNailsService {
  constructor(@InjectModel(GelPolishesQueenNails.name) private productModel: Model<GelPolishesQueenNailsDocument>) {
  }

  async getAll(): Promise<GelPolishesQueenNails[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<GelPolishesQueenNails> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateGelPolishesQueenNailsDto): Promise<GelPolishesQueenNails> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<GelPolishesQueenNails> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateGelPolishesQueenNailsDto): Promise<GelPolishesQueenNails> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
