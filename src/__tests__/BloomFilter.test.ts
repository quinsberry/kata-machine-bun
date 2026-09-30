import BloomFilter from "@code/BloomFilter";
import { expect, test } from "bun:test";
test("sets all hash bits and permits deterministic collisions", () => {
    const hashes = [(s: string) => s.charCodeAt(0), (s: string) => -s.length];
    const filter = new BloomFilter(128, hashes);
    expect(filter.has("cat")).toBe(false);
    filter.add("cat");
    filter.add("cat");
    expect(filter.has("cat")).toBe(true);
    expect(filter.has("car")).toBe(true);
    expect(filter.has("dog")).toBe(false); // Same length bit, different first-character bit.
    expect(filter.has("cats")).toBe(false); // Same first-character bit, different length bit.
    for (const value of ["dog", "cats", "rabbit"]) filter.add(value);
    for (const value of ["cat", "dog", "cats", "rabbit"])
        expect(filter.has(value)).toBe(true);
});
test("invalid configuration", () => {
    for (const bits of [0, -1, 1.5, NaN, Infinity])
        expect(() => new BloomFilter(bits, [() => 0])).toThrow(RangeError);
    expect(() => new BloomFilter(8, [])).toThrow(RangeError);
    const filter = new BloomFilter(1, [() => -10]);
    filter.add("a");
    expect(filter.has("anything")).toBe(true);
});
