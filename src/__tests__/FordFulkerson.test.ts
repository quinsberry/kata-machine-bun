import flow from "@code/FordFulkerson";
import { expect, test } from "bun:test";

function check(
    capacities: number[][],
    source: number,
    sink: number,
    expected: number,
) {
    const before = structuredClone(capacities);
    const result = flow(capacities, source, sink);
    expect(result.maxFlow).toBe(expected);
    expect(capacities).toEqual(before);
    expect(new Set(result.minCut).size).toBe(result.minCut.length);
    expect(result.minCut).toContain(source);
    expect(result.minCut).not.toContain(sink);
    const side = new Set(result.minCut);
    for (const v of side)
        expect(Number.isInteger(v) && v >= 0 && v < capacities.length).toBe(
            true,
        );
    let cutCapacity = 0;
    capacities.forEach((row, from) =>
        row.forEach((capacity, to) => {
            if (side.has(from) && !side.has(to)) cutCapacity += capacity;
        }),
    );
    expect(cutCapacity).toBe(result.maxFlow);
}

test("classic network, reverse residual edges, and unreachable sink", () => {
    check(
        [
            [0, 16, 13, 0, 0, 0],
            [0, 0, 10, 12, 0, 0],
            [0, 4, 0, 0, 14, 0],
            [0, 0, 9, 0, 0, 20],
            [0, 0, 0, 7, 0, 4],
            [0, 0, 0, 0, 0, 0],
        ],
        0,
        5,
        23,
    );
    // A DFS path 0->1->3->5 must be rerouted using residual edge 3->1.
    check(
        [
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        0,
        5,
        2,
    );
    check(
        [
            [0, 2, 0],
            [0, 0, 0],
            [0, 0, 0],
        ],
        0,
        2,
        0,
    );
    check(
        [
            [0, 0, 0],
            [3, 0, 0],
            [0, 4, 0],
        ],
        2,
        0,
        3,
    );
});

test("invalid capacities and endpoints", () => {
    for (const matrix of [
        [],
        [[0, 1]],
        [
            [0, -1],
            [0, 0],
        ],
        [
            [0, 1.5],
            [0, 0],
        ],
        [
            [0, NaN],
            [0, 0],
        ],
        [
            [0, Infinity],
            [0, 0],
        ],
    ]) {
        expect(() => flow(matrix, 0, 1)).toThrow(RangeError);
    }
    for (const [source, sink] of [
        [0, 0],
        [-1, 1],
        [0, 2],
        [0, 0.5],
        [NaN, 1],
    ]) {
        expect(() =>
            flow(
                [
                    [0, 1],
                    [0, 0],
                ],
                source!,
                sink!,
            ),
        ).toThrow(RangeError);
    }
});
