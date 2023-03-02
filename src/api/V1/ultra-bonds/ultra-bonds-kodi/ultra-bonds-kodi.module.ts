import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UltraBondsKodiService } from './ultra-bonds-kodi.service';
import { UltraBondsKodiController } from './ultra-bonds-kodi.controller';
import {UltraBondsKodi, UltraBondsKodiSchema,} from './schemas/ultra-bonds-kodi';

@Module({
  providers: [UltraBondsKodiService],
  controllers: [UltraBondsKodiController],
  imports: [
    MongooseModule.forFeature([
      {name: UltraBondsKodi.name, schema: UltraBondsKodiSchema}
    ])
  ]
})
export class UltraBondsKodiModule {
}
