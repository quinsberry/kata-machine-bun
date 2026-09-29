/**
 * Time complexity O(n).
 * @description Searching through each element in an array until the target is found.
 */
export function linearSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

/**
 * Time complexity O(log n).
 * @description Searching in a sorted array by repeatedly dividing the search interval in half.
 */
export function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const value = arr[mid]!;
        if (value === target) {
            return mid;
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

/**
 * Time complexity O(n log n).
 * @description Improved version of binary search for uniformly distributed data.
 */
export function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low]! && target <= arr[high]!) {
        if (low === high) {
            if (arr[low] === target) return low;
            return -1;
        }

        if (arr[high] === arr[low]) return arr[low] === target ? low : -1;

        const pos =
            low +
            Math.floor(
                ((target - arr[low]!) * (high - low)) /
                    (arr[high]! - arr[low]!),
            );

        if (arr[pos] === target) {
            return pos;
        }

        if (arr[pos]! < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    return -1;
}

/**
 * Time complexity O(n^2).
 * @description Searching for an element while performing bubble sort (not efficient for searching).
 */
export function bubbleSortSearch(arr: number[], target: number): number {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j]! > arr[j + 1]!) {
                [arr[j], arr[j + 1]] = [arr[j + 1]!, arr[j]!];
            }
        }
    }
    return binarySearch(arr, target);
}

/**
 * Time complexity O(2^n).
 * @description Checking if there is a subset of numbers that sum up to a given number.
 */
export function subsetSum(arr: number[], target: number): boolean {
    return subsetSumHelper(arr, arr.length, target);
}

function subsetSumHelper(arr: number[], n: number, sum: number): boolean {
    if (sum === 0) return true;
    if (n === 0) return false;

    const value = arr[n - 1]!;
    if (value > sum) {
        return subsetSumHelper(arr, n - 1, sum);
    }

    return (
        subsetSumHelper(arr, n - 1, sum) ||
        subsetSumHelper(arr, n - 1, sum - value)
    );
}

/**
 * Time complexity O(n!).
 * @description Searching through all permutations of a set.
 */
export function bruteForceSearch(arr: number[], target: number): boolean {
    const permutations = permute(arr);
    for (const perm of permutations) {
        if (perm.includes(target)) {
            return true;
        }
    }
    return false;
}

function permute(arr: number[]): number[][] {
    if (arr.length === 0) return [[]];
    const result: number[][] = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = permute(arr.slice(0, i).concat(arr.slice(i + 1)));
        for (const perm of rest) {
            result.push([arr[i]!, ...perm]);
        }
    }
    return result;
}
