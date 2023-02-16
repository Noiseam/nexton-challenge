import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags,ApiBody } from '@nestjs/swagger';
import { CalculatorService } from '../services/calculator.service';
@ApiTags('calculator')
@Controller('calculator')
export class CalculatorController {
  private calculatorService: CalculatorService;

  constructor() {
    this.calculatorService = CalculatorService.getInstance();
  }
  
  @Post()
  @ApiBody({
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
  calculate(@Body() body: { expression: string }): string {
    return this.calculatorService.calculate(body.expression);
  }
}