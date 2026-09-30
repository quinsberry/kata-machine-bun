import kruskal from "@code/KruskalList";
import { circleList1 } from "./data/graph";
import { checkMST, tiedGraph } from "./data/MSTTest";
import { expect, test } from "bun:test";

test("minimum spanning tree, ties, negative edges and input preservation", () => {
    for (const [graph, weight] of [
        [circleList1, 9],
        [tiedGraph, 2],
        [[[]], 0],
        [[], 0],
        [
            [
                [
                    { to: 0, weight: -100 },
                    { to: 1, weight: -2 },
                    { to: 2, weight: 4 },
                ],
                [
                    { to: 0, weight: -2 },
                    { to: 2, weight: 1 },
                ],
                [
                    { to: 0, weight: 4 },
                    { to: 1, weight: 1 },
                ],
            ],
            -1,
        ],
    ] as [WeightedAdjacencyList, number][]) {
        const before = structuredClone(graph);
        checkMST(graph, kruskal(graph), weight);
        expect(graph).toEqual(before);
    }
});
test("disconnected graph has no spanning tree", () => {
    expect(kruskal([[], []])).toBeNull();
    expect(
        kruskal([[{ to: 1, weight: 1 }], [{ to: 0, weight: 1 }], []]),
    ).toBeNull();
});
