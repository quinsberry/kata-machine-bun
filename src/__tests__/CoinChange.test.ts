import change from "@code/CoinChange";
import { expect, test } from "bun:test";
test("counts combinations, not permutations or minimum coins", () => {
    expect(change([1, 2, 5], 5)).toBe(4);
    expect(change([2], 3)).toBe(0);
    expect(change([], 0)).toBe(1);
    expect(change([], 3)).toBe(0);
    expect(change([2, 3, 7], 12)).toBe(4);
    const coins = [5, 1, 2, 2];
    expect(change(coins, 5)).toBe(4);
    expect(coins).toEqual([5, 1, 2, 2]);
});
test("invalid denominations and amounts", () => {
    for (const coins of [[0], [-1], [1.5], [NaN], [Infinity]])
        expect(() => change(coins, 0)).toThrow(RangeError);
    for (const amount of [-1, 1.5, NaN, Infinity])
        expect(() => change([1], amount)).toThrow(RangeError);
});
