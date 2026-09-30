import maxSubarray from "@code/MaxSubarray";
import { expect, test } from "bun:test";
test("maximum contiguous sum, including all-negative and empty inputs", () => {
    for (const [values, expected] of [
        [[], 0],
        [[-5], -5],
        [[-8, -2, -6], -2],
        [[0, 0], 0],
        [[1, 2, 3], 6],
        [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 6],
        [[5, -10, 6], 6],
    ] as [number[], number][]) {
        const before = [...values];
        expect(maxSubarray(values)).toBe(expected);
        expect(values).toEqual(before);
    }
});
