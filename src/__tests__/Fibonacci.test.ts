import fibonacci from "@code/Fibonacci";
import { expect, test } from "bun:test";
test("Fibonacci base cases and reusable subproblems", () => {
    for (const [n, expected] of [
        [0, 0],
        [1, 1],
        [2, 1],
        [10, 55],
        [50, 12586269025],
        [78, 8944394323791464],
    ])
        expect(fibonacci(n!)).toBe(expected!);
    for (const n of [-1, 1.5, 79, NaN, Infinity])
        expect(() => fibonacci(n)).toThrow(RangeError);
});
