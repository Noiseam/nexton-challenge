import { Module } from '@nestjs/common';
import { CalculatorController } from './controllers/calculator.controller';
import { CalculatorService } from './services/calculator.service';

@Module({
  imports: [],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class AppModule {}