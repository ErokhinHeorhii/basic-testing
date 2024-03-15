// Uncomment the code below and write your tests
import {
    // getBankAccount,
    BankAccount, InsufficientFundsError
} from '.';

describe('BankAccount', () => {
    test('should create account with initial balance', () => {
        const balance = 100500
        const acc = new BankAccount(balance)
        expect(acc.getBalance()).toBe(balance)
    });

    test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
        const balance = 100500
        const acc = new BankAccount(balance)
        expect(() => acc.withdraw(100505)).toThrow(InsufficientFundsError)
    });

    test('should throw error when transferring more than balance', () => {
        const balance = 100500
        const acc = new BankAccount(balance)
        const toAcc = new BankAccount(balance)
        expect(() => acc.transfer(100505, toAcc)).toThrow(InsufficientFundsError)
    });

    test('should throw error when transferring to the same account', () => {
        // Write your test here
    });

    test('should deposit money', () => {
        // Write your test here
    });

    test('should withdraw money', () => {
        // Write your test here
    });

    test('should transfer money', () => {
        // Write your test here
    });

    test('fetchBalance should return number in case if request did not failed', async () => {
        // Write your tests here
    });

    test('should set new balance if fetchBalance returned number', async () => {
        // Write your tests here
    });

    test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
        // Write your tests here
    });
});
