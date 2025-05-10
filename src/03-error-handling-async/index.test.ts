// Uncomment the code below and write your tests
import {
    throwError,
    resolveValue, throwCustomError, rejectCustomError, MyAwesomeError,
} from './index';

describe('resolveValue', () => {
    test('should resolve provided value', async () => {
        const data = await resolveValue("url");
        expect(data).toBe("url");
    });
});

describe('throwError', () => {
    test('should throw error with provided message', () => {
        expect(() => throwError("Your Error")).toThrow("Your Error");
    });

    test('should throw error with default message if message is not provided', () => {
        expect(() => throwError()).toThrow("Oops")
    });
});

describe('throwCustomError', () => {
    test('should throw custom error',() => {
        try {
            throwCustomError();
        } catch (err) {
            expect(err).toBeInstanceOf(MyAwesomeError);
            expect((err as Error).message).toBe('This is my awesome custom error!');
        }
    });
});

describe('rejectCustomError', () => {
    test('should reject custom error', async () => {
        await expect(rejectCustomError()).rejects.toThrow('This is my awesome custom error!');
    });
});
