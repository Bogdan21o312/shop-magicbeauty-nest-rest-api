import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {MongooseModule} from "@nestjs/mongoose";
import {GelPolishesKodiModule, GelPolishesQueenNailsModule} from "./api/V1";
import {LampForManicureModule} from "./api/V1/lamp";
import {TransparentBaseKodiModule, TransparentBaseQueenNailsModule} from "./api/V1/base";
import {TopKodiModule, TopQueenNailsModule} from "./api/V1/top";
import {PrimerKodiModule, PrimerQueenNailsModule} from "./api/V1/primer";
import {UltraBondsKodiModule, UltraBondsQueenNailsModule} from "./api/V1/ultra-bonds";
import {UsersModule} from "./api/V1/users";

// @ts-ignore
// @ts-ignore
@Module({
    imports: [

        ConfigModule.forRoot({
            envFilePath: '.development.env',
        }),

        MongooseModule.forRoot(process.env.MONGOSE_URL),

        // Gel polishes import

        GelPolishesKodiModule,
        GelPolishesQueenNailsModule,

        // Lamp import

        LampForManicureModule,

        // Transparent base import

        TransparentBaseQueenNailsModule,
        TransparentBaseKodiModule,

        // Top import

        TopKodiModule,
        TopQueenNailsModule,

        // Primer import

        PrimerKodiModule,
        PrimerQueenNailsModule,

        // Ultra bonds import

        UltraBondsKodiModule,
        UltraBondsQueenNailsModule,

        // Users import

        UsersModule

    ],

    controllers: [AppController],

    providers: [AppService],

})

export class AppModule {
}
