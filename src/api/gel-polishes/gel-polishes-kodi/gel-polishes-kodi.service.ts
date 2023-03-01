import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {GelPolishesKodi, GelPolishesKodiDocument} from "./schemas/gel-polishes-kodi";
import {CreateGelPolishesKodiDto} from "./dto/create-gel-polishes-kodi.dto";
import {UpdateGelPolishesKodiDto} from "./dto/update-gel-polishes-kodi.dto";

@Injectable()
export class GelPolishesKodiService {
  constructor(@InjectModel(GelPolishesKodi.name) private productModel: Model<GelPolishesKodiDocument>) {
  }

  async getAll(): Promise<GelPolishesKodi[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<GelPolishesKodi> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateGelPolishesKodiDto): Promise<GelPolishesKodi> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<GelPolishesKodi> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateGelPolishesKodiDto): Promise<GelPolishesKodi> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
