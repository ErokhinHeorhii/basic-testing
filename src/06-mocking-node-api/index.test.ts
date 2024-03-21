// Uncomment the code below and write your tests
import {
  doStuffByInterval,
  readFileAsynchronously,
  doStuffByTimeout,
} from '.';
import path from 'node:path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(3)
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500)
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(4000);
    expect(callback).toHaveBeenCalledTimes(8)
  });
});

describe('readFileAsynchronously', () => {
  const _path = 'wrong/path/for.test';

  test('should call join with pathToFile', async () => {

    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(_path);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, _path);
  });



  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
