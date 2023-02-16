import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from '../controllers/calculator.controller';
import { CalculatorService } from '../services/calculator.service';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
    service = module.get<CalculatorService>(CalculatorService);
  });

  describe('calculate', () => {
    it('should call the calculate method of the CalculatorService with the provided expression', () => {
      const expression = '1 + 2 * (3 - 4) / 5';
      const expected = '0.6'; // update expected value to a string
      const calculateSpy = jest.spyOn(service, 'calculate').mockReturnValue(expected);
  
      const result = controller.calculate({ expression });
  
      expect(calculateSpy).toHaveBeenCalledWith(expression);
      expect(result).toBe(expected);
    });
  });
});