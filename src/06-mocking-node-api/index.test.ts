// Uncomment the code below and write your tests
import {
    doStuffByInterval,
    readFileAsynchronously,
    doStuffByTimeout,
} from '.';
import path from 'node:path';
import * as fs from "fs";

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

    test('should call join with pathToFile', async () => {
        jest.spyOn(path, 'join');
        const pathToFile = './index.ts';
        await readFileAsynchronously(pathToFile);
        expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
    })

    test('should return null if file does not exist', async () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        const file = await readFileAsynchronously('./index.ts');
        expect(file).toBeNull();
    });

    test('should return file content if file exists', async () => {
        const pathToFile = '/index.ts';
        const content = 'Hello';

        jest
            .spyOn(fs.promises, 'readFile')
            .mockResolvedValue(Buffer.from(content));
        expect(await readFileAsynchronously(pathToFile)).toBe(content);
    });
});
