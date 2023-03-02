import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UltraBondsQueenNailsService } from './ultra-bonds-queen-nails.service';
import { UltraBondsQueenNailsController } from './ultra-bonds-queen-nails.controller';
import {UltraBondsQueenNails, UltraBondsQueenNailsSchema,} from './schemas/ultra-bonds-queen-nails';

@Module({
  providers: [UltraBondsQueenNailsService],
  controllers: [UltraBondsQueenNailsController],
  imports: [
    MongooseModule.forFeature([
      {name: UltraBondsQueenNails.name, schema: UltraBondsQueenNailsSchema}
    ])
  ]
})
export class UltraBondsQueenNailsModule {
}
