import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 7, b: 4, action: Action.Subtract, expected: 3 },
  { a: 4, b: 1, action: Action.Subtract, expected: 3 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 0, b: 5, action: Action.Multiply, expected: 0 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 1, b: 2, action: '#', expected: null },
  { a: 1, b: 5, action: '%', expected: null },
  { a: 7, b: 2, action: '**', expected: null },
  { a: 3, b: '2', action: Action.Add, expected: null },
  { a: '5', b: 2, action: Action.Subtract, expected: null },
  { a: '8', b: '2', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculates %p: when a = $a, b = $b, action = $action, expected = $expected',
    (item) => {
      const { a, b, action, expected } = item;
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
