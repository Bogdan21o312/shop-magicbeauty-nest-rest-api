import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {TransparentBaseKodi, TransparentBaseKodiDocument} from "./schemas/transparent-base-kodi";
import {CreateTransparentBaseKodiDto} from "./dto/create-transparent-base-kodi.dto";
import {UpdateTransparentBaseKodiDto} from "./dto/update-transparent-base-kodi.dto";

@Injectable()
export class TransparentBaseKodiService {
  constructor(@InjectModel(TransparentBaseKodi.name) private productModel: Model<TransparentBaseKodiDocument>) {
  }

  async getAll(): Promise<TransparentBaseKodi[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<TransparentBaseKodi> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreateTransparentBaseKodiDto): Promise<TransparentBaseKodi> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<TransparentBaseKodi> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdateTransparentBaseKodiDto): Promise<TransparentBaseKodi> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
