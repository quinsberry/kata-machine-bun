import {
    linearSearch,
    binarySearch,
    interpolationSearch,
    bubbleSortSearch,
    subsetSum,
    bruteForceSearch,
} from "./search-algorythms";
import { time } from "../utils";

export function searchFasterThanLogarithmic(
    fn: (arr: number[], target: number) => void,
): boolean {
    const arr = Array.from({ length: 10_000 }, (_, i) => 10_000 - i);
    const target = 0;

    const binarySearchTime = time(() => binarySearch(arr, target));
    const fnTime = time(() => fn(arr, target));

    return fnTime < binarySearchTime;
}

export function searchFasterThanLinear(
    fn: (arr: number[], target: number) => void,
): boolean {
    const arr = Array.from({ length: 10_000 }, (_, i) => 10_000 - i);
    const target = 0;

    const linearSearchTime = time(() => linearSearch(arr, target));
    const fnTime = time(() => fn(arr, target));

    return fnTime < linearSearchTime;
}

export function searchFasterThanLinearithmic(
    fn: (arr: number[], target: number) => void,
): boolean {
    const worstCaseForInterpolationSearch = Array.from(
        { length: 100_000 },
        (_, i) => (i === 9999 ? 100_000 : 1),
    );
    const target = 1;

    const interpolationSearchTime = time(() =>
        interpolationSearch(worstCaseForInterpolationSearch, target),
    );
    const fnTime = time(() => fn(worstCaseForInterpolationSearch, target));

    return fnTime < interpolationSearchTime;
}

export function searchFasterThanQuadratic(
    fn: (arr: number[], target: number) => void,
): boolean {
    const arr = Array.from({ length: 10_000 }, (_, i) => 10_000 - i);
    const target = 0;

    const bubbleSortSearchTime = time(() => bubbleSortSearch(arr, target));
    const fnTime = time(() => fn(arr, target));

    return fnTime < bubbleSortSearchTime;
}

export function searchFasterThanExponential(
    fn: (arr: number[], target: number) => void,
): boolean {
    const arr = Array.from({ length: 10 }, (_, i) => 10 - i);
    const target = 0;

    const subsetSumTime = time(() => subsetSum(arr, target));
    const fnTime = time(() => fn(arr, target));

    return fnTime < subsetSumTime;
}

export function searchFasterThanFactorial(
    fn: (arr: number[], target: number) => void,
): boolean {
    const arr = Array.from({ length: 10 }, (_, i) => 10 - i);
    const target = 0;

    const bruteForceSearchTime = time(() => bruteForceSearch(arr, target));
    const fnTime = time(() => fn(arr, target));

    return fnTime < bruteForceSearchTime;
}

export function searchFasterThan(
    complexity:
        "O(log n)" | "O(n)" | "O(n log n)" | "O(n^2)" | "O(2^n)" | "O(n!)",
    fn: (arr: number[], target: number) => void,
): boolean {
    switch (complexity) {
        case "O(log n)":
            return searchFasterThanLogarithmic(fn);
        case "O(n)":
            return searchFasterThanLinear(fn);
        case "O(n log n)":
            return searchFasterThanLinearithmic(fn);
        case "O(n^2)":
            return searchFasterThanQuadratic(fn);
        case "O(2^n)":
            return searchFasterThanExponential(fn);
        case "O(n!)":
            return searchFasterThanFactorial(fn);
        default:
            throw new Error("Unknown complexity");
    }
}
