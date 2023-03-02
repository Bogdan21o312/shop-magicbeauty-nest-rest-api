import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UltraBondsKodi, UltraBondsKodiDocument} from "./schemas/ultra-bonds-kodi";
import {CreateUltraBondsKodiDto} from "./dto/create-ultra-bonds-kodi.dto";
import {UpdateUltraBondsKodiDto} from "./dto/update-ultra-bonds-kodi.dto";

@Injectable()
export class UltraBondsKodiService {
  constructor(@InjectModel(UltraBondsKodi.name) private productModel: Model<UltraBondsKodiDocument>) {
  }

  async getAll(): Promise<UltraBondsKodi[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<UltraBondsKodi> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateUltraBondsKodiDto): Promise<UltraBondsKodi> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<UltraBondsKodi> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateUltraBondsKodiDto): Promise<UltraBondsKodi> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
