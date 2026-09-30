import factorial from "@code/Factorial";
import { expect, test } from "bun:test";
test("factorial base cases and exact numeric range", () => {
    for (const [n, expected] of [
        [0, 1],
        [1, 1],
        [5, 120],
        [10, 3628800],
        [18, 6402373705728000],
    ])
        expect(factorial(n!)).toBe(expected!);
    for (const n of [-1, 1.5, 19, NaN, Infinity])
        expect(() => factorial(n)).toThrow(RangeError);
});
