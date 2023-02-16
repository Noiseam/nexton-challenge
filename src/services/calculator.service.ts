import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  public static instance: CalculatorService;

  public constructor() {}

  public static getInstance(): CalculatorService {
    if (!CalculatorService.instance) {
      CalculatorService.instance = new CalculatorService();
    }
    return CalculatorService.instance;
  }

  calculate(expression: string): string {
    // Replace all whitespace characters
    if (expression.includes('/0')) {
      throw new BadRequestException('Division by zero');
    }
    const sanitizedExpression = expression.replace(/\s+/g, '');
    
    // Check for matching pairs of parenthesis
    const openingParenthesisIndexes: number[] = [];
    const closingParenthesisIndexes: number[] = [];
    for (let i = 0; i < sanitizedExpression.length; i++) {
      if (sanitizedExpression[i] === '(') {
        openingParenthesisIndexes.push(i);
      } else if (sanitizedExpression[i] === ')') {
        closingParenthesisIndexes.push(i);
      }
    }
    if (openingParenthesisIndexes.length !== closingParenthesisIndexes.length) {
      throw new Error('Mismatched parenthesis');
    }

    // Evaluate the expression inside each pair of parenthesis recursively
    let result = sanitizedExpression;
    for (let i = openingParenthesisIndexes.length - 1; i >= 0; i--) {
      const startIndex = openingParenthesisIndexes[i];
      const endIndex = closingParenthesisIndexes[i];
      const expressionInsideParenthesis = sanitizedExpression.substring(startIndex + 1, endIndex);
      const resultInsideParenthesis = this.calculateWithoutParenthesis(expressionInsideParenthesis);
      result = result.substring(0, startIndex) + resultInsideParenthesis + result.substring(endIndex + 1);
    }

    // calculate the final expression without parenthesis
    const finalResult = this.calculateWithoutParenthesis(result);
    return finalResult.toString();
  }

  calculateWithoutParenthesis(expression: string): number {
    const operands = expression.split(/[-+]/).map((operand) => {
      return parseFloat(operand) || 0; // return 0 for invalid operands (e.g. "-")
    });
  
    const operators = expression.split('').filter((char) => {
      return '+-*/'.includes(char);
    });
  
    // First, evaluate all divisions and multiplications
    let result = operands[0];
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const operand = operands[i + 1];
  
      if (operator === '*' || operator === '/') {
        const prevOperand = operands[i];
        if (operator === '*') {
          result = prevOperand * operand;
        } else if (operator === '/') {
          if (operand === 0) {
            throw new BadRequestException('Division by zero');
          }
          result = prevOperand / operand;
        }
        operands[i + 1] = result;
      }
    }
  
    // Then, evaluate all additions and subtractions
    result = operands[0];
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const operand = operands[i + 1];
  
      if (operator === '+' || operator === '-') {
        if (operator === '+') {
          result += operand;
        } else if (operator === '-') {
          result -= operand;
        }
      }
    }
  
    try {
      const result = eval(expression);
      if (typeof result !== 'number') {
        throw new BadRequestException('Invalid expression');
      }
      console.log(result)
      return result;
    } catch (e) {
      throw new BadRequestException('Invalid expression');
    }
  }
}