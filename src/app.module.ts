import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {MongooseModule} from "@nestjs/mongoose";
import {GelPolishesKodiModule, GelPolishesQueenNailsModule} from "./api";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        MongooseModule.forRoot(process.env.MONGOSE_URL),
        GelPolishesKodiModule,
        GelPolishesQueenNailsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
