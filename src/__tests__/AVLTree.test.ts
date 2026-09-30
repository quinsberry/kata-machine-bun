import AVLTree from "@code/AVLTree";
import { describe, expect, test } from "bun:test";
import { checkBinaryTree, searchTreeTests } from "./data/SearchTreeTest";
describe("AVLTree", () => {
    searchTreeTests(() => new AVLTree(), true);
    test("all four insertion rotation cases", () => {
        for (const order of [
            [3, 2, 1],
            [1, 2, 3],
            [3, 1, 2],
            [1, 3, 2],
        ]) {
            const tree = new AVLTree();
            for (const value of order) tree.insert(value);
            expect(tree.root?.value).toBe(2);
            expect(checkBinaryTree(tree.root, true)).toEqual([1, 2, 3]);
        }
    });
});
