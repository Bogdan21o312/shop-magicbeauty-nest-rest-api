import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GelPolishesKodi, GelPolishesKodiDocument } from "./schemas/gel-polishes-kodi";
import { GelPolishesKodiDto } from "./dto/gel-polishes-kodi.dto";
import { FileService, FileType } from "../file/file.service";

interface HistoryLogEntry {
  date?: Date;
  timestamp?: Date;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  field?: string;
}

@Injectable()
export class GelPolishesKodiService {
  constructor(@InjectModel(GelPolishesKodi.name) private GelPolishesKodiModel: Model<GelPolishesKodiDocument>,private fileService: FileService) {
  }

  async findAll(limit = 10, page = 1, search = ""): Promise<[GelPolishesKodiDocument[], number]> {
    const skip = (page - 1) * limit;
    const gelPolishes = await this.GelPolishesKodiModel
      .find({ name: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.GelPolishesKodiModel.countDocuments({ name: { $regex: search, $options: "i" } });
    return [gelPolishes, total];
  }

  async create(userDto: GelPolishesKodiDto, picture): Promise<GelPolishesKodiDocument> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const gelPolishes = new this.GelPolishesKodiModel( {...userDto, picture: picturePath } );
    return gelPolishes.save();
  }

  async findById(id: string): Promise<GelPolishesKodiDocument> {
    return this.GelPolishesKodiModel.findById(id).exec();
  }

  async delete(id: string): Promise<GelPolishesKodiDocument> {
    return this.GelPolishesKodiModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, gelPolishesDto: GelPolishesKodiDto): Promise<GelPolishesKodiDocument> {
    const GelPolishesKodiBeforeUpdate = await this.GelPolishesKodiModel.findById(id).exec();
    const GelPolishesKodiAfterUpdate = await this.GelPolishesKodiModel
      .findByIdAndUpdate(id, gelPolishesDto, { new: true })
      .exec();

    const before = GelPolishesKodiBeforeUpdate.toObject();
    delete before.history;

    const after = GelPolishesKodiAfterUpdate.toObject();
    delete after.history;

    const logEntry: HistoryLogEntry = {
      date: new Date(),
      before,
      after
    };

    GelPolishesKodiAfterUpdate.history = [...(GelPolishesKodiAfterUpdate.history || []), logEntry as any];

    return GelPolishesKodiAfterUpdate.save();
  }
}
