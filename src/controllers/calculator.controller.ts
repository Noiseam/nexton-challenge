import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalculatorService } from '../services/calculator.service';
@ApiTags('calculator')
@Controller('calculator')
export class CalculatorController {
  private calculatorService: CalculatorService;

  constructor() {
    this.calculatorService = CalculatorService.getInstance();
  }
  
  @Post()
  calculate(@Body() body: { expression: string }): string {
    return this.calculatorService.calculate(body.expression);
  }
}