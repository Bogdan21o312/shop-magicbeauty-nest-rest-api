import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {MongooseModule} from "@nestjs/mongoose";
import {GelPolishesKodiModule, GelPolishesQueenNailsModule} from "./api/V1";
import {LampForManicureModule} from "./api/V1/lamp";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),
        MongooseModule.forRoot(process.env.MONGOSE_URL),
        GelPolishesKodiModule,
        GelPolishesQueenNailsModule,
        LampForManicureModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
