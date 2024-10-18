// Uncomment the code below and write your tests
import { simpleCalculator, Action, RawCalculatorInput } from './index';

function checkAction<T extends { [key: string]: string }>(
  action: string,
  currentEnum: T,
): string | null {
  const actions = Object.values(currentEnum) as string[];
  return actions.includes(action) ? action : null;
}

function checkArgs(input: RawCalculatorInput): null | void {
  if (typeof input.a !== 'number' || typeof input.b !== 'number') {
    return null;
  }
}

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 2,
      b: 3,
      action: '+',
    };
    expect(simpleCalculator(input)).toBe(5);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 8,
      b: 2,
      action: '-',
    };
    expect(simpleCalculator(input)).toBe(6);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 2,
      b: 5,
      action: '*',
    };
    expect(simpleCalculator(input)).toBe(10);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 8,
      b: 2,
      action: '/',
    };
    expect(simpleCalculator(input)).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 3,
      b: 2,
      action: '^',
    };
    expect(simpleCalculator(input)).toBe(9);
  });

  test('should return null for invalid action', () => {
    const wrongAction = '#';
    expect(checkAction(wrongAction, Action)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidInput = {
      a: 3,
      b: '2',
      action: '+',
    };

    expect(checkArgs(invalidInput)).toBeNull();
  });
});
