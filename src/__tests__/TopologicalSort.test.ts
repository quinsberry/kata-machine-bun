import sort from "@code/TopologicalSort";
import { expect, test } from "bun:test";
test("any valid ordering includes disconnected and isolated vertices", () => {
    for (const graph of [
        [],
        [[], [], []],
        [[1, 2], [3], [3], [], [5], [], []],
    ]) {
        const order = sort(graph);
        expect(order).not.toBeNull();
        expect([...order!].sort((a, b) => a - b)).toEqual(
            graph.map((_, i) => i),
        );
        const position = new Map(order!.map((v, i) => [v, i]));
        graph.forEach((edges, from) =>
            edges.forEach((to) =>
                expect(position.get(from)!).toBeLessThan(position.get(to)!),
            ),
        );
    }
});
test("cycles, including a disconnected cycle and self-loop", () => {
    for (const graph of [[[0]], [[1], [2], [0]], [[], [2], [1]]])
        expect(sort(graph)).toBeNull();
});
