import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GelPolishesQueenNailsService } from './gel-polishes-queen-nails.service';
import { GelPolishesQueenNailsController } from './gel-polishes-queen-nails.controller';
import {GelPolishesQueenNails, GelPolishesQueenNailsSchema} from './schemas/gel-polishes-queen-nails';

@Module({
  providers: [GelPolishesQueenNailsService],
  controllers: [GelPolishesQueenNailsController],
  imports: [
    MongooseModule.forFeature([
      {name: GelPolishesQueenNails.name, schema: GelPolishesQueenNailsSchema}
    ])
  ]
})
export class GelPolishesQueenNailsModule {
}
