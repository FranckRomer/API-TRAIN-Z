import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DispTrainModule } from './disp_train/disp_train.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [DispTrainModule, MongooseModule.forRoot('mongodb://train:ALAala123,.-@74.208.16.217:28021')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
