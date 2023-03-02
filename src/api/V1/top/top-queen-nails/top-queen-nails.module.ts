import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopQueenNailsService } from './top-queen-nails.service';
import { TopQueenNailsController } from './top-queen-nails.controller';
import {TopQueenNails, TopQueenNailsSchema,} from './schemas/top-queen-nails';

@Module({
  providers: [TopQueenNailsService],
  controllers: [TopQueenNailsController],
  imports: [
    MongooseModule.forFeature([
      {name: TopQueenNails.name, schema: TopQueenNailsSchema}
    ])
  ]
})
export class TopQueenNailsModule {
}
