import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CalculatorService } from '../services/calculator.service';

@Controller('calculator')
export class CalculatorController {
  private calculatorService: CalculatorService;

  constructor() {
    this.calculatorService = CalculatorService.getInstance();
  }

  @Post()
  @ApiOperation({ summary: 'Calculate an arithmetic expression' })
  @ApiBody({
    description: 'The arithmetic expression to be calculated',
    required: true,
    schema: {
      type: 'object',
      properties: {
        expression: {
          type: 'string',
          example: '1 + 2 * (3 - 4) / 5',
        },
      },
    },
  })
  calculate(@Body() body: { expression: string }): number {
    return this.calculatorService.calculate(body.expression);
  }
}