import fs from 'fs';
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

const fakeCallback = jest.fn();
const fakeTime = 3000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(fakeCallback, fakeTime);
    expect(setTimeout).toHaveBeenCalledWith(fakeCallback, fakeTime);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(fakeCallback, fakeTime);
    expect(fakeCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(fakeTime);
    expect(fakeCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(fakeCallback, fakeTime);
    expect(setInterval).toHaveBeenCalledWith(fakeCallback, fakeTime);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const numOfTimes = 5;
    doStuffByInterval(fakeCallback, fakeTime);
    expect(fakeCallback).not.toBeCalled();
    jest.advanceTimersByTime(fakeTime * numOfTimes);
    expect(fakeCallback).toBeCalledTimes(numOfTimes);
  });
});

const testPath = '/somepath/text.txt';
const testContent = 'Some text to read';

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    readFileAsynchronously(testPath);
    expect(path.join).toHaveBeenCalledWith(testPath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(testPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(testContent);
    const result = await readFileAsynchronously(testPath);
    expect(result).toBe(testContent);
  });
});
