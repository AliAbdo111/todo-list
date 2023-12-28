import { Test, TestingModule } from '@nestjs/testing';
import { ProfileControllerController } from './profile-controller.controller';

describe('ProfileControllerController', () => {
  let controller: ProfileControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileControllerController],
    }).compile();

    controller = module.get<ProfileControllerController>(ProfileControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
