import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {TopKodi, TopKodiDocument} from "./schemas/top-kodi";
import {CreateTopKodiDto} from "./dto/create-top-kodi.dto";
import {UpdateTopKodiDto} from "./dto/update-top-kodi.dto";

@Injectable()
export class TopKodiService {
  constructor(@InjectModel(TopKodi.name) private productModel: Model<TopKodiDocument>) {
  }

  async getAll(): Promise<TopKodi[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<TopKodi> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateTopKodiDto): Promise<TopKodi> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<TopKodi> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateTopKodiDto): Promise<TopKodi> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
