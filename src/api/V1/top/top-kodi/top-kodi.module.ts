import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopKodiService } from './top-kodi.service';
import { TopKodiController } from './top-kodi.controller';
import {TopKodi, TopKodiSchema,} from './schemas/top-kodi';

@Module({
  providers: [TopKodiService],
  controllers: [TopKodiController],
  imports: [
    MongooseModule.forFeature([
      {name: TopKodi.name, schema: TopKodiSchema}
    ])
  ]
})
export class TopKodiModule {
}
