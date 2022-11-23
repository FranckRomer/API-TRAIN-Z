import { Test, TestingModule } from '@nestjs/testing';
import { DispTrainService } from './disp_train.service';

describe('DispTrainService', () => {
  let service: DispTrainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispTrainService],
    }).compile();

    service = module.get<DispTrainService>(DispTrainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
