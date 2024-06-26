// Uncomment the code below and write your tests
import {simpleCalculator, Action } from './index';

type TestCase = {
    a: number
    b: number
    action: Action
    expected: number
}
const testCases:TestCase[]  = [
    {a: 1, b: 2, action: Action.Add, expected: 3},
    {a: 2, b: 2, action: Action.Add, expected: 4},
    {a: 3, b: 2, action: Action.Add, expected: 5},
    {a: 3, b: 1, action: Action.Divide, expected: 3},
    {a: 10, b: 2, action: Action.Divide, expected: 5},
    {a: 10, b: 2, action: Action.Subtract, expected: 8},
];

describe('simpleCalculatorTable', () => {
   test.each(testCases)(`should return `,({ a, b, action, expected }) => {
            expect(simpleCalculator({ a, b, action })).toBe(expected);
        });
});
