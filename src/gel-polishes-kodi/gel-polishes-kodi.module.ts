import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GelPolishesKodiService } from './gel-polishes-kodi.service';
import { GelPolishesKodiController } from './gel-polishes-kodi.controller';
import {GelPolishesKodi, GelPolishesKodiSchema} from './schemas/gel-polishes-kodi';
import { FileService } from "../file/file.service";

@Module({
  providers: [GelPolishesKodiService, FileService],
  controllers: [GelPolishesKodiController],
  imports: [
    MongooseModule.forFeature([
      {name: GelPolishesKodi.name, schema: GelPolishesKodiSchema}
    ])
  ]
})
export class GelPolishesKodiModule {
}
