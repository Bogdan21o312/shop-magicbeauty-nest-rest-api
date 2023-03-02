import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransparentBaseQueenNailsService } from './transparent-base-queen-nails.service';
import { TransparentBaseQueenNailsController } from './transparent-base-queen-nails.controller';
import {TransparentBaseQueenNails, TransparentBaseQueenNailsSchema,} from './schemas/transparent-base-queen-nails';

@Module({
  providers: [TransparentBaseQueenNailsService],
  controllers: [TransparentBaseQueenNailsController],
  imports: [
    MongooseModule.forFeature([
      {name: TransparentBaseQueenNails.name, schema: TransparentBaseQueenNailsSchema}
    ])
  ]
})
export class TransparentBaseQueenNailsModule {
}
