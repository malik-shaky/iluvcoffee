import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.environment',
      // ignoreEnvFile: true,

      // validationSchema: Joi.object({
      //   DB_Host: Joi.required(),
      //   DB_PORT: Joi.number().default(5432),
      // }),

      load: [appConfig],
    }), //load and parse .env file from default location(project root)
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_Host,
        port: +process.env.DB_Port, //values coming from env by default are string.
        username: process.env.DB_Username,
        password: process.env.DB_Password,
        database: process.env.DB_Database,
        autoLoadEntities: true,
        synchronize: true, //disable in PRODUCTION
      }),
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
