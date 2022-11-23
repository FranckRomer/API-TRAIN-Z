import { Module } from '@nestjs/common';
import { DispTrainController } from './disp_train.controller';
import { DispTrainService } from './disp_train.service';

@Module({
  controllers: [DispTrainController],
  providers: [DispTrainService]
})
export class DispTrainModule {}
