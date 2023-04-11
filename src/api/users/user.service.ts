import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SchemaUser, UserDocument } from "./schemas/user.schema";
import { UserDto } from "./dto/user.dto";

interface HistoryLogEntry {
  date?: Date;
  timestamp?: Date;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  field?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(SchemaUser.name) private userModel: Model<UserDocument>
  ) {
  }

  async findAll(limit = 10, page = 1, search = ""): Promise<[SchemaUser[], number]> {
    const skip = (page - 1) * limit;
    const users = await this.userModel
      .find({ name: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.userModel.countDocuments({ name: { $regex: search, $options: "i" } });
    return [users, total];
  }

  async findByEmail(email: string): Promise<SchemaUser> {
    return this.userModel.findOne({ email }).exec();
  }


  async create(userDto: UserDto): Promise<SchemaUser> {
    const user = new this.userModel(userDto);
    return user.save();
  }

  async findById(id: string): Promise<SchemaUser> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<SchemaUser> {
    return this.userModel.findByIdAndRemove(id).exec();
  }


  async update(id: string, userDto: UserDto): Promise<SchemaUser> {
    const userBeforeUpdate = await this.userModel.findById(id).exec();
    const userAfterUpdate = await this.userModel
      .findByIdAndUpdate(id, userDto, { new: true })
      .exec();

    const before = userBeforeUpdate.toObject();
    delete before.history;

    const after = userAfterUpdate.toObject();
    delete after.history;

    const logEntry: HistoryLogEntry = {
      date: new Date(),
      before,
      after
    };


    userAfterUpdate.history = [...(userAfterUpdate.history || []), logEntry as any];

    return userAfterUpdate.save();
  }
}
