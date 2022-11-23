import { Test, TestingModule } from '@nestjs/testing';
import { DispTrainController } from './disp_train.controller';

describe('DispTrainController', () => {
  let controller: DispTrainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispTrainController],
    }).compile();

    controller = module.get<DispTrainController>(DispTrainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
