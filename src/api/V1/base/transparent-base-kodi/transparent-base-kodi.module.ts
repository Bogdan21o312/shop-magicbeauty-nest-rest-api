import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransparentBaseKodiService } from './transparent-base-kodi.service';
import { TransparentBaseKodiController } from './transparent-base-kodi.controller';
import {TransparentBaseKodi, TransparentBaseKodiSchema,} from './schemas/transparent-base-kodi';

@Module({
  providers: [TransparentBaseKodiService],
  controllers: [TransparentBaseKodiController],
  imports: [
    MongooseModule.forFeature([
      {name: TransparentBaseKodi.name, schema: TransparentBaseKodiSchema}
    ])
  ]
})
export class TransparentBaseKodiModule {
}
