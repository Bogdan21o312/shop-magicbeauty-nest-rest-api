import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrimerKodiService } from './primer-kodi.service';
import { PrimerKodiController } from './primer-kodi.controller';
import {PrimerKodi, PrimerKodiSchema,} from './schemas/primer-kodi';

@Module({
  providers: [PrimerKodiService],
  controllers: [PrimerKodiController],
  imports: [
    MongooseModule.forFeature([
      {name: PrimerKodi.name, schema: PrimerKodiSchema}
    ])
  ]
})
export class PrimerKodiModule {
}
