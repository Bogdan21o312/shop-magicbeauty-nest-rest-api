import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LampForManicureService } from './lamp-for-manicure.service';
import { LampForManicureController } from './lamp-for-manicure.controller';
import {LampForManicure, LampForManicureSchema} from './schemas/lamp-for-manicure';

@Module({
  providers: [LampForManicureService],
  controllers: [LampForManicureController],
  imports: [
    MongooseModule.forFeature([
      {name: LampForManicure.name, schema: LampForManicureSchema}
    ])
  ]
})
export class LampForManicureModule {
}
