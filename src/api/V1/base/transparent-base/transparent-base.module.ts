import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransparentBaseService } from './transparent-base.service';
import { TransparentBaseController } from './transparent-base.controller';
import {TransparentBase, TransparentBaseSchema,} from './schemas/transparent-base';

@Module({
  providers: [TransparentBaseService],
  controllers: [TransparentBaseController],
  imports: [
    MongooseModule.forFeature([
      {name: TransparentBase.name, schema: TransparentBaseSchema}
    ])
  ]
})
export class TransparentBaseModule {
}
