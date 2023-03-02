import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {PrimerQueenNails, PrimerQueenNailsDocument} from "./schemas/primer-queen-nails";
import {CreatePrimerQueenNailsDto} from "./dto/create-primer-queen-nails.dto";
import {UpdatePrimerQueenNailsDto} from "./dto/update-primer-queen-nails.dto";

@Injectable()
export class PrimerQueenNailsService {
  constructor(@InjectModel(PrimerQueenNails.name) private productModel: Model<PrimerQueenNailsDocument>) {
  }

  async getAll(): Promise<PrimerQueenNails[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<PrimerQueenNails> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreatePrimerQueenNailsDto): Promise<PrimerQueenNails> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<PrimerQueenNails> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdatePrimerQueenNailsDto): Promise<PrimerQueenNails> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
