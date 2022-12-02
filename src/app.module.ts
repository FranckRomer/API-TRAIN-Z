import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DispTrainModule } from './disp_train/disp_train.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TablesService } from './tables/tables.service';
import { TablesController } from './tables/tables.controller';

@Module({
  imports: [DispTrainModule, MongooseModule.forRoot('mongodb://train:ALAala123,.-@74.208.16.217:28021')],
  controllers: [AppController, TablesController],
  providers: [AppService, TablesService],
})
export class AppModule {}
