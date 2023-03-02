import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UltraBondsQueenNails, UltraBondsQueenNailsDocument} from "./schemas/ultra-bonds-queen-nails";
import {CreateUltraBondsQueenNailsDto} from "./dto/create-ultra-bonds-queen-nails.dto";
import {UpdateUltraBondsQueenNailsDto} from "./dto/update-ultra-bonds-queen-nails.dto";

@Injectable()
export class UltraBondsQueenNailsService {
  constructor(@InjectModel(UltraBondsQueenNails.name) private productModel: Model<UltraBondsQueenNailsDocument>) {
  }

  async getAll(): Promise<UltraBondsQueenNails[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<UltraBondsQueenNails> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateUltraBondsQueenNailsDto): Promise<UltraBondsQueenNails> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<UltraBondsQueenNails> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateUltraBondsQueenNailsDto): Promise<UltraBondsQueenNails> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
