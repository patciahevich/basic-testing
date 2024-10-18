import fs from 'fs';
import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

const fakeCallback = jest.fn();
const fakeTime = 3000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const fakeTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(fakeCallback, fakeTime);
    expect(fakeTimeout).toHaveBeenCalledWith(fakeCallback, fakeTime);
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
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const fakeInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(fakeCallback, fakeTime);
    expect(fakeInterval).toHaveBeenCalledWith(fakeCallback, fakeTime);
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
const currentDir = __dirname;

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const fakeJoin = jest.spyOn(path, 'join');
    readFileAsynchronously(testPath);
    expect(fakeJoin).toHaveBeenCalledWith(currentDir, testPath);
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
