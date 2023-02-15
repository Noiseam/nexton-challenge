import { Injectable } from '@nestjs/common';

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

  calculate(expression: string): number {
    // Replace all whitespace characters
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
    return finalResult;
  }

  calculateWithoutParenthesis(expression: string): number {
    const operands = expression.split(/[-+*/]/).map((operand) => {
      return parseFloat(operand);
    });

    const operators = expression.split('').filter((char) => {
      return '+-*/'.includes(char);
    });

    let result = operands[0];
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const operand = operands[i + 1];

      switch (operator) {
        case '+':
          result += operand;
          break;
        case '-':
          result -= operand;
          break;
        case '*':
          result *= operand;
          break;
        case '/':
          result /= operand;
          break;
        default:
          throw new Error(`Unknown operator: ${operator}`);
      }
    }

    return result;
  }
}