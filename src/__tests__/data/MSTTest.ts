import { expect } from "bun:test";

export function checkMST(
    graph: WeightedAdjacencyList,
    tree: WeightedAdjacencyList | null,
    weight: number,
) {
    expect(tree).not.toBeNull();
    expect(tree!).toHaveLength(graph.length);
    const parents = graph.map((_, i) => i);
    function find(i: number): number {
        return parents[i] === i ? i : find(parents[i]!);
    }
    let edges = 0;
    let total = 0;
    tree!.forEach((list, from) =>
        list.forEach((edge) => {
            expect(
                Number.isInteger(edge.to) &&
                    edge.to >= 0 &&
                    edge.to < graph.length,
            ).toBe(true);
            expect(
                graph[from]!.some(
                    (e) => e.to === edge.to && e.weight === edge.weight,
                ),
            ).toBe(true);
            expect(
                tree![edge.to]!.filter(
                    (e) => e.to === from && e.weight === edge.weight,
                ).length,
            ).toBe(1);
            expect(edge.to).not.toBe(from);
            if (from < edge.to) {
                const a = find(from),
                    b = find(edge.to);
                expect(a).not.toBe(b);
                parents[a] = b;
                edges++;
                total += edge.weight;
            }
        }),
    );
    expect(edges).toBe(Math.max(0, graph.length - 1));
    expect(total).toBe(weight);
    if (graph.length)
        expect(new Set(graph.map((_, i) => find(i))).size).toBe(1);
}

export const tiedGraph: WeightedAdjacencyList = [
    [
        { to: 1, weight: 1 },
        { to: 2, weight: 1 },
    ],
    [
        { to: 0, weight: 1 },
        { to: 2, weight: 1 },
    ],
    [
        { to: 0, weight: 1 },
        { to: 1, weight: 1 },
    ],
];
