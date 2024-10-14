import { random } from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

const INITIAL_BALANCE = 10;

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(INITIAL_BALANCE);
  });
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testWithdrawingSum = 20;

    expect(() => bankAccount.withdraw(testWithdrawingSum)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const testTransferSum = 300;
    const testAccount = getBankAccount(10);
    expect(() => bankAccount.transfer(testTransferSum, testAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const testTransferSum = 30;
    expect(() => bankAccount.transfer(testTransferSum, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const testDepositSum = 15;
    expect(bankAccount.deposit(testDepositSum).getBalance()).toBe(
      INITIAL_BALANCE + testDepositSum,
    );
  });

  test('should withdraw money', () => {
    const testWithdrawSum = 5;
    expect(bankAccount.withdraw(testWithdrawSum).getBalance()).toBe(
      INITIAL_BALANCE - testWithdrawSum,
    );
  });

  test('should transfer money', () => {
    const testTransferSum = 5;
    const testAccount = getBankAccount(10);

    expect(
      bankAccount.transfer(testTransferSum, testAccount).getBalance(),
    ).toBe(INITIAL_BALANCE - testTransferSum);

    expect(testAccount.getBalance()).toBe(INITIAL_BALANCE + testTransferSum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 10;
    (random as jest.Mock).mockReturnValueOnce(mockBalance);
    (random as jest.Mock).mockReturnValueOnce(1);
    const balance = await bankAccount.fetchBalance();

    expect(balance).toBe(mockBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 10;
    (random as jest.Mock).mockReturnValueOnce(mockBalance);
    (random as jest.Mock).mockReturnValueOnce(1);
    await bankAccount.synchronizeBalance();
    const balance = bankAccount.getBalance();

    expect(balance).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockBalance = 10;
    (random as jest.Mock).mockReturnValueOnce(mockBalance);
    (random as jest.Mock).mockReturnValueOnce(0);

    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
