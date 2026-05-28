import { test, beforeEach, expect } from "bun:test";

export function test_list(createList: () => List<number>): void {
    let list: List<number>;

    beforeEach(() => {
        list = createList();
    });

    test("prepend", () => {
        list.append(2);
        list.prepend(1);
        expect(list.get(0)).toBe(1);
    });

    test("append", () => {
        expect(list.get(0)).toBeUndefined();
        list.append(1);
        expect(list.get(0)).toBe(1);
    });

    test("insertAt", () => {
        list.append(1);
        list.append(3);
        list.insertAt(2, 1);
        expect(list.get(1)).toBe(2);
    });

    test("remove", () => {
        list.append(1);
        list.remove(1);
        expect(list.get(0)).toBeUndefined();
    });

    test("removeAt", () => {
        list.prepend(1);
        list.append(3);
        list.insertAt(2, 1); // [1,2,3]
        expect(list.get(1)).toBe(2);
        expect(list.removeAt(1)).toBe(2); // [1,3]
        expect(list.get(1)).toBe(3);
    });

    test("length", () => {
        expect(list.length).toBe(0);
        list.append(1);
        list.prepend(2);
        expect(list.length).toBe(2);
        list.removeAt(0);
        expect(list.length).toBe(1);
        list.remove(4);
        list.remove(1);
        expect(list.length).toBe(0);
    });

    test("insertAt with invalid index", () => {
        list.append(1);
        list.append(3);
        list.insertAt(2, 3);
        expect(list.get(0)).toBe(1);
        expect(list.get(1)).toBe(3);
    });

    test("remove non-existing element", () => {
        list.append(1);
        expect(list.remove(2)).toBeUndefined();
    });

    test("removeAt with invalid index", () => {
        list.append(1);
        list.append(2);
        expect(list.removeAt(3)).toBeUndefined();
    });

    test("get with invalid index", () => {
        list.append(1);
        list.append(2);
        expect(list.get(3)).toBeUndefined();
    });
}
