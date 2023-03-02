import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrimerQueenNailsService } from './primer-queen-nails.service';
import { PrimerQueenNailsController } from './primer-queen-nails.controller';
import {PrimerQueenNails, PrimerQueenNailsSchema,} from './schemas/primer-queen-nails';

@Module({
  providers: [PrimerQueenNailsService],
  controllers: [PrimerQueenNailsController],
  imports: [
    MongooseModule.forFeature([
      {name: PrimerQueenNails.name, schema: PrimerQueenNailsSchema}
    ])
  ]
})
export class PrimerQueenNailsModule {
}
