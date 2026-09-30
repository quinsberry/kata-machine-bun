import IndexedMinHeap from "@code/IndexedMinHeap";
import { expect, test } from "bun:test";
test("priority updates move both directions and keep the key index valid", () => {
    const heap = new IndexedMinHeap();
    expect(heap.length).toBe(0);
    expect(heap.delete()).toBeUndefined();
    heap.insert(10, 5);
    heap.insert(20, 3);
    heap.insert(30, 8);
    expect(heap.length).toBe(3);
    expect(heap.has(20)).toBe(true);
    expect(() => heap.insert(20, 9)).toThrow();
    expect(() => heap.update(99, 1)).toThrow();
    heap.update(30, 1);
    heap.update(20, 10);
    expect(heap.delete()).toEqual({ key: 30, priority: 1 });
    expect(heap.has(30)).toBe(false);
    heap.update(10, 11);
    expect(heap.delete()).toEqual({ key: 20, priority: 10 });
    expect(heap.delete()).toEqual({ key: 10, priority: 11 });
    expect(heap.length).toBe(0);
    expect(heap.delete()).toBeUndefined();
    heap.insert(30, -2);
    expect(heap.delete()).toEqual({ key: 30, priority: -2 });
});
test("equal priorities and repeated removals", () => {
    const heap = new IndexedMinHeap();
    for (let i = 0; i < 30; i++) heap.insert(i, i % 5);
    const removed = new Set<number>();
    let previous = -Infinity;
    for (let i = 0; i < 30; i++) {
        const item = heap.delete()!;
        expect(item.priority).toBeGreaterThanOrEqual(previous);
        previous = item.priority;
        expect(removed.has(item.key)).toBe(false);
        removed.add(item.key);
        expect(item.priority).toBe(item.key % 5);
        expect(heap.length).toBe(29 - i);
    }
});
