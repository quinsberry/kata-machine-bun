import BTree from "@code/BTree";
import { expect, test } from "bun:test";

function check(tree: BTree, degree: number): number[] {
    const depths = new Set<number>();
    const seen = new Set<BTreeNode>();
    function visit(
        node: BTreeNode,
        low: number,
        high: number,
        depth: number,
    ): number[] {
        expect(seen.has(node)).toBe(false);
        seen.add(node);
        expect(node.keys.length).toBeLessThanOrEqual(2 * degree - 1);
        if (depth > 0)
            expect(node.keys.length).toBeGreaterThanOrEqual(degree - 1);
        else if (node.children.length)
            expect(node.keys.length).toBeGreaterThan(0);
        let previous = low;
        for (const key of node.keys) {
            expect(key).toBeGreaterThan(previous);
            expect(key).toBeLessThan(high);
            previous = key;
        }
        if (!node.children.length) {
            depths.add(depth);
            return [...node.keys];
        }
        expect(node.children.length).toBe(node.keys.length + 1);
        const values: number[] = [];
        for (let i = 0; i < node.children.length; i++) {
            values.push(
                ...visit(
                    node.children[i]!,
                    i === 0 ? low : node.keys[i - 1]!,
                    node.keys[i] ?? high,
                    depth + 1,
                ),
            );
            if (i < node.keys.length) values.push(node.keys[i]!);
        }
        return values;
    }
    const values = visit(tree.root, -Infinity, Infinity, 0);
    expect(depths.size).toBe(1);
    return values;
}

test("degree validation", () => {
    for (const t of [0, 1, -1, 2.5, NaN, Infinity])
        expect(() => new BTree(t)).toThrow(RangeError);
});

test("splitting, internal/leaf deletion, borrowing, merging and root shrink", () => {
    for (const degree of [2, 3, 5]) {
        for (const order of [
            Array.from({ length: 80 }, (_, i) => i),
            Array.from({ length: 80 }, (_, i) => 79 - i),
        ]) {
            const tree = new BTree(degree);
            expect(check(tree, degree)).toEqual([]);
            expect(tree.has(99)).toBe(false);
            expect(tree.delete(99)).toBe(false);
            const expected = new Set<number>();
            for (const value of order) {
                tree.insert(value);
                tree.insert(value);
                expected.add(value);
                expect(tree.has(value)).toBe(true);
                expect(check(tree, degree)).toEqual(
                    [...expected].sort((a, b) => a - b),
                );
            }
            // Alternating halves exercises internal keys as well as both leaf boundaries.
            for (let i = 0; i < 80; i++) {
                const value = (i * 37) % 80;
                expect(tree.delete(value)).toBe(true);
                expected.delete(value);
                expect(tree.has(value)).toBe(false);
                expect(tree.delete(value)).toBe(false);
                expect(check(tree, degree)).toEqual(
                    [...expected].sort((a, b) => a - b),
                );
            }
            expect(tree.root).toEqual({ keys: [], children: [] });
        }
    }
});
