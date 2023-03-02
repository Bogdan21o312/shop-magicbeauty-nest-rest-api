import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {PrimerKodi, PrimerKodiDocument} from "./schemas/primer-kodi";
import {CreatePrimerKodiDto} from "./dto/create-primer-kodi.dto";
import {UpdatePrimerKodiDto} from "./dto/update-primer-kodi.dto";

@Injectable()
export class PrimerKodiService {
  constructor(@InjectModel(PrimerKodi.name) private productModel: Model<PrimerKodiDocument>) {
  }

  async getAll(): Promise<PrimerKodi[]> {
    return this.productModel.find().exec()
  }

  async getById(id: string): Promise<PrimerKodi> {
    return this.productModel.findById(id)
  }

  async create(productDto: CreatePrimerKodiDto): Promise<PrimerKodi> {
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id: string): Promise<PrimerKodi> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id: string, productDto: UpdatePrimerKodiDto): Promise<PrimerKodi> {
    return this.productModel.findByIdAndUpdate(id, productDto, {new: true})
  }
}
