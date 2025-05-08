// Uncomment the code below and write your tests
import {
    // getBankAccount,
    BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError
} from '.';

describe('BankAccount', () => {
    const balance = 100500
    test('should create account with initial balance', () => {
        const acc = new BankAccount(balance)
        expect(acc).toBeInstanceOf(BankAccount);
        expect(acc.getBalance()).toBe(balance)
    });

    test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
        const acc = new BankAccount(balance)
        expect(() => acc.withdraw(100505)).toThrow(InsufficientFundsError)
    });

    test('should throw error when transferring more than balance', () => {
        const acc = new BankAccount(balance)
        const toAcc = new BankAccount(balance)
        expect(() => acc.transfer(100505, toAcc)).toThrow(InsufficientFundsError)
    });

    test('should throw error when transferring to the same account', () => {
        const acc = new BankAccount(balance)
        expect(() => acc.transfer(100505, acc)).toThrow(TransferFailedError)    });

    test('should deposit money', () => {
        const acc = new BankAccount(balance)
        expect( acc.deposit(balance).getBalance()).toEqual(balance * 2 )
    });

    test('should withdraw money', () => {
        const acc = new BankAccount(balance)
        expect( acc.withdraw(100500).getBalance()).toEqual(0)
    });

    test('should transfer money', () => {
        const acc = new BankAccount(balance)
        const transferMany=100499
        const accZero = new BankAccount(0)
        expect( acc.transfer(transferMany,accZero).getBalance()).toEqual(1)
        expect(accZero.getBalance()).toEqual(transferMany);
    });

    test('fetchBalance should return number in case if request did not fail', async () => {
        const acc = new BankAccount(0);
        acc.fetchBalance = jest.fn().mockResolvedValue(42);
        const balance = await acc.fetchBalance();
        expect(balance).not.toBeNull();
        expect(typeof balance).toBe('number');
        expect(balance).toBe(42)
    });

    test('should set new balance if fetchBalance returned number', async () => {
        const acc = new BankAccount(balance);
        acc.fetchBalance = jest.fn().mockResolvedValue(50)
        const updateBalance = await acc.fetchBalance();
        await acc.synchronizeBalance();
        expect(updateBalance).not.toBeNull();
        expect(typeof balance).toBe('number');
        expect(updateBalance).not.toBe(balance);
        expect(acc.getBalance()).toBe(updateBalance);
    });

    test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
        const acc = new BankAccount(balance);
        acc.fetchBalance = jest.fn().mockResolvedValue(null);
        await expect(acc.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
        await expect(acc.synchronizeBalance()).rejects.toThrow('Synchronization failed');
    });
});
