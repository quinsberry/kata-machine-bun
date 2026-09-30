import { expect, test } from "bun:test";

type SearchTree = {
    root: BinaryNode<number> | null;
    insert(value: number): void;
    delete(value: number): boolean;
    has(value: number): boolean;
};

export function checkBinaryTree(
    root: BinaryNode<number> | null,
    balanced = false,
): number[] {
    const values: number[] = [];
    const seen = new Set<BinaryNode<number>>();
    function visit(
        node: BinaryNode<number> | null,
        low: number,
        high: number,
    ): number {
        if (!node) return 0;
        expect(seen.has(node)).toBe(false);
        seen.add(node);
        expect(node.value).toBeGreaterThan(low);
        expect(node.value).toBeLessThan(high);
        const left = visit(node.left, low, node.value);
        values.push(node.value);
        const right = visit(node.right, node.value, high);
        if (balanced) expect(Math.abs(left - right)).toBeLessThanOrEqual(1);
        return 1 + Math.max(left, right);
    }
    visit(root, -Infinity, Infinity);
    return values;
}

export function searchTreeTests(create: () => SearchTree, balanced = false) {
    test("empty tree, duplicates and deletion cases", () => {
        const tree = create();
        expect(tree.root).toBeNull();
        expect(tree.has(8)).toBe(false);
        expect(tree.delete(8)).toBe(false);
        const expected = new Set<number>();
        for (const value of [8, 3, 10, 1, 6, 14, 4, 7, 13, 8]) {
            tree.insert(value);
            expected.add(value);
            expect(checkBinaryTree(tree.root, balanced)).toEqual(
                [...expected].sort((a, b) => a - b),
            );
            expect(tree.has(value)).toBe(true);
        }
        for (const value of [1, 14, 3, 8, 6, 4, 7, 10, 13]) {
            expect(tree.delete(value)).toBe(true);
            expected.delete(value);
            expect(tree.has(value)).toBe(false);
            expect(tree.delete(value)).toBe(false);
            expect(checkBinaryTree(tree.root, balanced)).toEqual(
                [...expected].sort((a, b) => a - b),
            );
        }
        expect(tree.root).toBeNull();
    });
    test("sorted insertions and repeated root deletion", () => {
        const tree = create();
        for (let i = 0; i < 64; i++) {
            tree.insert(i);
            expect(checkBinaryTree(tree.root, balanced)).toHaveLength(i + 1);
        }
        for (let remaining = 64; remaining > 0; remaining--) {
            expect(tree.delete(tree.root!.value)).toBe(true);
            expect(checkBinaryTree(tree.root, balanced)).toHaveLength(
                remaining - 1,
            );
        }
    });
}
