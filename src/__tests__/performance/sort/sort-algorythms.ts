/**
 * Time complexity O(n).
 * @description Efficient for sorting integers within a specific range.
 */
export function countingSort(arr: number[]): number[] {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const count = new Array(max - min + 1).fill(0);
    const output = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
        count[arr[i]! - min]++;
    }

    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1]!;
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]! - min] - 1] = arr[i];
        count[arr[i]! - min]--;
    }

    return output;
}

/**
 * Time complexity O(n).
 * @description Efficient for sorting numbers with a fixed number of digits.
 */
export function radixSort(arr: number[]): number[] {
    const max = Math.max(...arr);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        arr = countingSortByDigit(arr, exp);
        exp *= 10;
    }

    return arr;
}

function countingSortByDigit(arr: number[], exp: number): number[] {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
        const digit = Math.floor(arr[i]! / exp) % 10;
        count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1]!;
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i]! / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    return output;
}

/**
 * Time complexity O(n).
 * @description Efficient for uniformly distributed data.
 */
export function bucketSort(arr: number[]): number[] {
    const buckets: number[][] = [];
    const bucketSize = 5;

    const min = Math.min(...arr);
    const max = Math.max(...arr);

    const bucketCount = Math.floor((max - min) / bucketSize) + 1;

    for (let i = 0; i < bucketCount; i++) {
        buckets.push([]);
    }

    for (let i = 0; i < arr.length; i++) {
        const bucketIndex = Math.floor((arr[i]! - min) / bucketSize);
        buckets[bucketIndex]!.push(arr[i]!);
    }

    arr.length = 0;

    for (let i = 0; i < buckets.length; i++) {
        buckets[i]!.sort((a, b) => a - b);
        arr.push(...buckets[i]!);
    }

    return arr;
}

/**
 * Time complexity O(n log n).
 * @description Divide and conquer algorithm that splits the array and merges sorted halves.
 */
export function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i]! < right[j]!) {
            result.push(left[i]!);
            i++;
        } else {
            result.push(right[j]!);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * Time complexity O(n log n).
 * @description Uses a binary heap to sort elements.
 */
export function heapSort(arr: number[]): number[] {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i]!, arr[0]!];
        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left]! > arr[largest]!) {
        largest = left;
    }

    if (right < n && arr[right]! > arr[largest]!) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest]!, arr[i]!];
        heapify(arr, n, largest);
    }
}

/**
 * Time complexity O(n log n).
 * @description Divide and conquer algorithm that partitions the array around a pivot.
 */
export function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)]!;
    const left = arr.filter((x) => x < pivot);
    const right = arr.filter((x) => x > pivot);
    const middle = arr.filter((x) => x === pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
}

/**
 * Time complexity O(n^2).
 * @description Repeatedly swaps adjacent elements if they are in the wrong order.
 */
export function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j]! > arr[j + 1]!) {
                [arr[j], arr[j + 1]] = [arr[j + 1]!, arr[j]!];
            }
        }
    }
    return arr;
}

/**
 * Time complexity O(n^2).
 * @description Builds the sorted array one element at a time.
 */
export function insertionSort(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i]!;
        let j = i - 1;
        while (j >= 0 && arr[j]! > key) {
            arr[j + 1] = arr[j]!;
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

/**
 * Time complexity O(n^2).
 * @description Repeatedly selects the smallest element and moves it to the sorted portion of the array.
 */
export function selectionSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j]! < arr[minIndex]!) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex]!, arr[i]!];
    }
    return arr;
}

/**
 * Time complexity O(2^n).
 * @description Randomly shuffles the array until it is sorted (highly inefficient).
 */
export function bogoSort(arr: number[]): number[] {
    while (!isSorted(arr)) {
        shuffle(arr);
    }
    return arr;
}

function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i]! < arr[i - 1]!) {
            return false;
        }
    }
    return true;
}

function shuffle(arr: number[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
}

/**
 * Time complexity O(2^n).
 * @description Generates all permutations of the array and checks each one to see if it is sorted (extremely inefficient)
 */
export function bruteForceSort(arr: number[]): number[] {
    const permutations = permute(arr);
    for (const perm of permutations) {
        if (isSorted(perm)) {
            return perm;
        }
    }
    return arr;
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
