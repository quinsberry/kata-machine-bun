import binary_fn from "@code/BinarySearchList";
import { describe, expect, test } from "bun:test";
import { searchFasterThanLinear } from "./performance";

describe("BinarySearchList", () => {
    test("finds element in the middle of the array", () => {
        expect(binary_fn([1, 2, 3, 4, 5], 3)).toBeTrue();
    });

    test("finds element at the beginning of the array", () => {
        expect(binary_fn([1, 2, 3, 4, 5], 1)).toBeTrue();
    });

    test("finds element at the end of the array", () => {
        expect(binary_fn([1, 2, 3, 4, 5], 5)).toBeTrue();
    });

    test("returns false if element is not in the array", () => {
        expect(binary_fn([1, 2, 3, 4, 5], 6)).toBeFalse();
    });

    test("returns false if array is empty", () => {
        expect(binary_fn([], 1)).toBeFalse();
    });

    test("finds element in array of length 1", () => {
        expect(binary_fn([1], 1)).toBeTrue();
    });

    test("returns false if element is not in array of length 1", () => {
        expect(binary_fn([1], 2)).toBeFalse();
    });

    // test("should search faster than O(n)", () => {
    //     expect(searchFasterThanLinear(binary_fn)).toBeTrue();
    // });
});
