import UnionFind from "@code/UnionFind";
import { expect, test } from "bun:test";
test("components merge without depending on representative choice", () => {
    const sets = new UnionFind(6);
    expect(sets.connected(0, 1)).toBe(false);
    expect(sets.union(0, 1)).toBe(true);
    expect(sets.union(2, 3)).toBe(true);
    expect(sets.union(1, 3)).toBe(true);
    expect(sets.union(0, 2)).toBe(false);
    expect(sets.union(4, 4)).toBe(false);
    for (const i of [0, 1, 2, 3]) expect(sets.find(i)).toBe(sets.find(0));
    expect(sets.connected(0, 4)).toBe(false);
    expect(sets.union(4, 5)).toBe(true);
    expect(sets.union(3, 5)).toBe(true);
    expect(sets.connected(0, 4)).toBe(true);
});
test("size and index validation", () => {
    for (const size of [-1, 1.5, NaN, Infinity])
        expect(() => new UnionFind(size)).toThrow(RangeError);
    const sets = new UnionFind(3);
    for (const i of [-1, 3, 1.5, NaN]) {
        expect(() => sets.find(i)).toThrow(RangeError);
        expect(() => sets.union(0, i)).toThrow(RangeError);
        expect(() => sets.connected(i, 0)).toThrow(RangeError);
    }
    expect(() => new UnionFind(0).find(0)).toThrow(RangeError);
});
