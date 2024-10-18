import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const CUSTOM_ERROR = new MyAwesomeError();

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'Hello, world!';
    const result = await resolveValue(testValue);
    expect(result).toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testMessage = 'Test Error Message';
    expect(() => throwError(testMessage)).toThrow(testMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const customErrorMessage = CUSTOM_ERROR.message;
    expect(throwCustomError).toThrow(customErrorMessage);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const customErrorMessage = CUSTOM_ERROR.message;

    await expect(rejectCustomError()).rejects.toThrow(customErrorMessage);
  });
});
