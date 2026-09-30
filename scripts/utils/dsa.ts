import { part2 } from "./dsa-part2";
import { ClassMethod, ClassProperty } from "./AlgorythmGenerator";
import { DSA } from "./types";

const length_property: ClassProperty = {
    name: "length",
    type: "number",
    scope: "public",
};

const list_properties: ClassProperty[] = [length_property];
const list_methods: ClassMethod[] = [
    {
        name: "prepend",
        args: "item: T",
        return: "void",
    },
    {
        name: "insertAt",
        args: "item: T, idx: number",
        return: "void",
    },
    {
        name: "append",
        args: "item: T",
        return: "void",
    },
    {
        name: "remove",
        args: "item: T",
        return: "T | undefined",
    },
    {
        name: "get",
        args: "idx: number",
        return: "T | undefined",
    },
    {
        name: "removeAt",
        args: "idx: number",
        return: "T | undefined",
    },
];

export const dsa: DSA = {
    ...part2,
    LRU: {
        generic: "<K, V>",
        type: "class",
        args: "capacity: number",
        methods: [
            {
                name: "update",
                args: "key: K, value: V",
                return: "void",
            },
            {
                name: "get",
                args: "key: K",
                return: "V | undefined",
            },
        ],
        properties: [
            {
                name: "length",
                type: "number",
                scope: "private",
            },
        ],
        description: `/** 
            * LRU Cache
            * 
            * A Least Recently Used (LRU) cache is a data structure that stores a limited number of items.
            * When the cache reaches its capacity, it removes the least recently used item before inserting a new item.
            * 
            * Methods:
            * - update(key, value) - Updates the value of the key if it exists, otherwise adds the key-value pair to the cache.
            * - get(key) - Retrieves the value associated with the key if it exists, otherwise returns undefined.
            */
        `,
    },
    MinHeap: {
        type: "class",
        methods: [
            {
                name: "insert",
                args: "value: number",
                return: "void",
            },
            {
                name: "delete",
                args: "",
                return: "number",
            },
        ],
        properties: [length_property],
        description: `/** 
            * MinHeap
            * 
            * A MinHeap is a binary tree where the value of each node is less than or equal to the values of its children.
            * The root node has the smallest value.
            * 
            * Methods:
            * - insert(value) - Inserts a new value into the heap.
            * - delete(): number - Removes and returns the smallest value from the heap.
            */
        `,
    },
    Map: {
        generic: "<K extends (string | number), V>",
        type: "class",
        methods: [
            {
                name: "get",
                args: "key: K",
                return: "V | undefined",
            },
            {
                name: "set",
                args: "key: K, value: V",
                return: "void",
            },
            {
                name: "delete",
                args: "key: K",
                return: "V | undefined",
            },
            {
                name: "size",
                return: "number",
            },
        ],
        description: `/** 
            * Map
            * 
            * A Map is a collection of key-value pairs where each key is unique.
            * It allows for efficient retrieval, insertion, and deletion of key-value pairs.
            * 
            * Methods:
            * - get(key) - Retrieves the value associated with the key if it exists, otherwise returns undefined.
            * - set(key, value) - Adds or updates the key-value pair in the map.
            * - delete(key) - Removes the key-value pair from the map and returns the value if it existed, otherwise returns undefined.
            * - size() - Returns the number of key-value pairs in the map.
            */
        `,
    },
    RingBuffer: {
        generic: "<T>",
        type: "class",
        args: "capacity: number",
        methods: [
            {
                name: "push",
                args: "item: T",
                return: "void",
            },
            {
                name: "get",
                args: "idx: number",
                return: "T | undefined",
            },
            {
                name: "pop",
                return: "T | undefined",
            },
        ],
        properties: [length_property],
        description: `/** 
            * RingBuffer
            * 
            * A RingBuffer is a fixed-size buffer that operates in a circular manner.
            * When the buffer is full, new elements overwrite the oldest elements.
            * 
            * Methods:
            * - push(item) - Adds a new item to the buffer.
            * - get(idx) - Retrieves the item at the specified index.
            * - pop() - Removes and returns the oldest item from the buffer.
            */
        `,
    },
    ArrayList: {
        type: "class",
        args: "capacity: number",
        generic: "<T>",
        methods: list_methods,
        properties: list_properties,
        description: `/** 
            * ArrayList
            * 
            * An ArrayList is a dynamic array that can grow and shrink in size.
            * It provides random access to elements and allows for efficient insertion and deletion.
            * 
            * Methods:
            * - prepend(item) - Adds an item to the beginning of the list.
            * - insertAt(item, idx) - Inserts an item at the specified index. If the index is out of bounds, throws an error.
            * - append(item) - Adds an item to the end of the list.
            * - remove(item) - Removes the first occurrence of the item from the list and returns it, otherwise returns undefined.
            * - get(idx) - Retrieves the item at the specified index.
            * - removeAt(idx) - Removes the item at the specified index and returns it, otherwise returns undefined.
            */
        `,
    },
    SinglyLinkedList: {
        generic: "<T>",
        type: "class",
        methods: list_methods,
        properties: list_properties,
        description: `/** 
            * SinglyLinkedList
            * 
            * A SinglyLinkedList is a linear data structure where each element points to the next element.
            * It allows for efficient insertion and deletion at the beginning of the list.
            * 
            * Methods:
            * - prepend(item) - Adds an item to the beginning of the list.
            * - insertAt(item, idx) - Inserts an item at the specified index.
            * - append(item) - Adds an item to the end of the list.
            * - remove(item) - Removes the first occurrence of the item from the list and returns it, otherwise returns undefined.
            * - get(idx) - Retrieves the item at the specified index.
            * - removeAt(idx) - Removes the item at the specified index and returns it, otherwise returns undefined.
            */
        `,
    },
    DoublyLinkedList: {
        generic: "<T>",
        type: "class",
        methods: list_methods,
        properties: list_properties,
        description: `/** 
            * DoublyLinkedList
            * 
            * A DoublyLinkedList is a linear data structure where each element points to both the next and previous elements.
            * It allows for efficient insertion and deletion at both the beginning and end of the list.
            * 
            * Methods:
            * - prepend(item) - Adds an item to the beginning of the list.
            * - insertAt(item, idx) - Inserts an item at the specified index.
            * - append(item) - Adds an item to the end of the list.
            * - remove(item) - Removes the first occurrence of the item from the list and returns it, otherwise returns undefined.
            * - get(idx) - Retrieves the item at the specified index.
            * - removeAt(idx) - Removes the item at the specified index and returns it, otherwise returns undefined.
            */
        `,
    },
    Queue: {
        generic: "<T>",
        type: "class",
        properties: [length_property],
        methods: [
            {
                name: "enqueue",
                args: "item: T",
                return: "void",
            },
            {
                name: "deque",
                args: "",
                return: "T | undefined",
            },
            {
                name: "peek",
                args: "",
                return: "T | undefined",
            },
        ],
        description: `/** 
            * Queue
            * 
            * A Queue is a linear data structure that follows the First In First Out (FIFO) principle.
            * It allows for efficient insertion at the end and deletion at the front of the queue.
            * 
            * Methods:
            * - enqueue(item) - Adds an item to the end of the queue.
            * - deque() - Removes and returns the item at the front of the queue, otherwise returns undefined.
            * - peek() - Retrieves the item at the front of the queue without removing it, otherwise returns undefined.
            */
        `,
    },
    Stack: {
        generic: "<T>",
        type: "class",
        properties: [length_property],
        methods: [
            {
                name: "push",
                args: "item: T",
                return: "void",
            },
            {
                name: "pop",
                args: "",
                return: "T | undefined",
            },
            {
                name: "peek",
                args: "",
                return: "T | undefined",
            },
        ],
        description: `/** 
            * Stack
            * 
            * A Stack is a linear data structure that follows the Last In First Out (LIFO) principle.
            * It allows for efficient insertion and deletion at the top of the stack.
            * 
            * Methods:
            * - push(item) - Adds an item to the top of the stack.
            * - pop() - Removes and returns the item at the top of the stack, otherwise returns undefined.
            * - peek() - Retrieves the item at the top of the stack without removing it, otherwise returns undefined.
            */
        `,
    },
    Trie: {
        type: "class",
        methods: [
            {
                name: "insert",
                args: "item: string",
                return: "void",
            },
            {
                name: "delete",
                args: "item: string",
                return: "void",
            },
            {
                name: "find",
                args: "partial: string",
                return: "string[]",
            },
        ],
        description: `/** 
            * Trie
            * 
            * A Trie is a tree-like data structure used to store a dynamic set of strings.
            * It allows for efficient retrieval of strings with a common prefix.
            * 
            * Methods:
            * - insert(item) - Inserts a string into the trie.
            * - delete(item): void - Deletes a string from the trie.
            * - find(partial) - Returns an array of strings in the trie that start with the given prefix.
            */
        `,
    },
    BubbleSort: {
        type: "fn",
        fn: "bubble_sort",
        args: "arr: number[]",
        return: "void",
        description: `/** 
            * BubbleSort
            * 
            * Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
            * compares adjacent elements and swaps them if they are in the wrong order.
            * The pass through the list is repeated until the list is sorted.
            * 
            * @param arr - The array of numbers to be sorted.
            */
        `,
    },
    InsertionSort: {
        type: "fn",
        fn: "insertion_sort",
        args: "arr: number[]",
        return: "void",
        description: `/** 
            * InsertionSort
            * 
            * Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.
            * It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.
            * 
            * @param arr - The array of numbers to be sorted.
            */
        `,
    },
    MergeSort: {
        type: "fn",
        fn: "merge_sort",
        args: "arr: number[]",
        return: "void",
        description: `/** 
            * MergeSort
            * 
            * Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm.
            * Most implementations produce a stable sort, meaning that the implementation preserves the input order of equal elements in the sorted output.
            * 
            * @param arr - The array of numbers to be sorted.
            */
        `,
    },
    QuickSort: {
        type: "fn",
        fn: "quick_sort",
        args: "arr: number[]",
        return: "void",
        description: `/** 
            * QuickSort
            * 
            * Quick Sort is an efficient, in-place, comparison-based, divide and conquer sorting algorithm.
            * 
            * @param arr - The array of numbers to be sorted.
            */
        `,
    },
    DijkstraList: {
        type: "fn",
        fn: "dijkstra_list",
        args: "source: number, sink: number, arr: WeightedAdjacencyList",
        return: "number[]",
        description: `/** 
            * Dijkstra's Shortest Path algorithm
            * 
            * Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph.
            * Returns the shortest path from source to sink.
            * 
            * @param source - The starting node.
            * @param sink - The destination node.
            * @param arr - The weighted adjacency list representing the graph.
            * @returns An array of node indices representing the shortest path from source to sink.
            */
        `,
    },
    PrimsList: {
        type: "fn",
        fn: "prims",
        args: "list: WeightedAdjacencyList",
        return: "WeightedAdjacencyList | null",
        description: `/** 
            * Prim's Minimum Spanning Tree algorithm
            * 
            * Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.
            * The algorithm operates by building this tree one vertex at a time, from an arbitrary starting vertex, at each step adding the cheapest possible connection from the tree to another vertex.
            * 
            * @param list - The weighted adjacency list representing the graph.
            * @returns The minimum spanning tree as a weighted adjacency list, or null if the graph is empty.
            */
        `,
    },

    BinarySearchList: {
        type: "fn",
        fn: "bs_list",
        args: "haystack: number[], needle: number",
        return: "boolean",
        description: `/** 
            * Binary Search
            * 
            * Binary Search is an efficient algorithm for finding an item from a sorted list of items.
            * It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.
            * 
            * @param haystack - The sorted array to search through.
            * @param needle - The value to search for.
            * @returns true if the value is found, otherwise false.
            */
        `,
    },
    LinearSearchList: {
        type: "fn",
        fn: "linear_search",
        args: "haystack: number[], needle: number",
        return: "boolean",
        description: `/** 
            * Linear Search
            * 
            * Linear Search is a simple search algorithm that checks every element in the list until the desired element is found or the list ends.
            * 
            * @param haystack - The array to search through.
            * @param needle - The value to search for.
            * @returns true if the value is found, otherwise false.
            */
        `,
    },
    TwoCrystalBalls: {
        type: "fn",
        fn: "two_crystal_balls",
        args: "breaks: boolean[]",
        return: "number",
        description: `/** 
            * Two Crystal Balls Problem
            * 
            * This problem involves finding the highest floor from which you can drop a crystal ball without it breaking, using the fewest number of drops.
            * The algorithm works by first jumping in intervals of the square root of the total number of floors, and then performing a linear search within the interval where the first ball broke.
            * 
            * @param breaks - An array where each element represents whether a ball would break if dropped from that floor.
            * @returns The highest floor from which you can drop a ball without it breaking, or -1 if no such floor exists.
            */
        `,
    },
    MazeSolver: {
        type: "fn",
        fn: "solve",
        args: "maze: string[], wall: string, start: Point, end: Point",
        return: "Point[]",
        description: `/** 
            * Maze Solver
            * 
            * This function solves a maze represented as a 2D array of strings.
            * The maze contains walls, a start point, and an end point.
            * The function returns the path from the start point to the end point as an array of points.
            * 
            * @param maze - The 2D array representing the maze.
            * @param wall - The string representing a wall in the maze.
            * @param start - The starting point in the maze.
            * @param end - The ending point in the maze.
            * @returns An array of points representing the path from start to end.
            */
        `,
    },
    BTPreOrder: {
        type: "fn",
        fn: "pre_order_search",
        args: "head: BinaryNode<number>",
        return: "number[]",
        description: `/** 
            * Binary Tree Pre-Order Traversal
            * 
            * This function performs a pre-order traversal of a binary tree.
            * In pre-order traversal, the nodes are recursively visited in this order: root, left, right.
            * The function returns an array of values in the order they were visited.
            * 
            * @param head - The root node of the binary tree.
            * @returns An array of values in pre-order traversal order.
            */
        `,
    },
    BTInOrder: {
        type: "fn",
        fn: "in_order_search",
        args: "head: BinaryNode<number>",
        return: "number[]",
        description: `/** 
            * Binary Tree In-Order Traversal
            * 
            * This function performs an in-order traversal of a binary tree.
            * In in-order traversal, the nodes are recursively visited in this order: left, root, right.
            * The function returns an array of values in the order they were visited.
            * 
            * @param head - The root node of the binary tree.
            * @returns An array of values in in-order traversal order.
            */
        `,
    },
    BTPostOrder: {
        type: "fn",
        fn: "post_order_search",
        args: "head: BinaryNode<number>",
        return: "number[]",
        description: `/** 
            * Binary Tree Post-Order Traversal
            * 
            * This function performs a post-order traversal of a binary tree.
            * In post-order traversal, the nodes are recursively visited in this order: left, right, root.
            * The function returns an array of values in the order they were visited.
            * 
            * @param head - The root node of the binary tree.
            * @returns An array of values in post-order traversal order.
            */
        `,
    },
    BTBFS: {
        type: "fn",
        fn: "bfs",
        args: "head: BinaryNode<number>, needle: number",
        return: "boolean",
        description: `/** 
            * Binary Tree Breadth-First Search (BFS)
            * 
            * This function performs a breadth-first search on a binary tree to find a specific value.
            * BFS explores all nodes at the present depth level before moving on to nodes at the next depth level.
            * The function returns true if the value is found, otherwise false.
            * 
            * @param head - The root node of the binary tree.
            * @param needle - The value to search for.
            * @returns true if the value is found, otherwise false.
            */
        `,
    },
    CompareBinaryTrees: {
        type: "fn",
        fn: "compare",
        args: "a: BinaryNode<number> | null, b: BinaryNode<number> | null",
        return: "boolean",
        description: `/** 
            * Compare Binary Trees
            * 
            * This function compares two binary trees to determine if they are identical.
            * Two binary trees are considered identical if they have the same structure and node values.
            * The function returns true if the trees are identical, otherwise false.
            * 
            * @param a - The root node of the first binary tree.
            * @param b - The root node of the second binary tree.
            * @returns true if the trees are identical, otherwise false.
            */
        `,
    },
    DFSOnBST: {
        type: "fn",
        fn: "dfs",
        args: "head: BinaryNode<number>, needle: number",
        return: "boolean",
        description: `/** 
            * Depth-First Search (DFS) on Binary Search Tree (BST)
            * 
            * This function performs a depth-first search on a binary search tree to find a specific value.
            * DFS explores as far as possible along each branch before backtracking.
            * The function returns true if the value is found, otherwise false.
            * 
            * @param head - The root node of the binary search tree.
            * @param needle - The value to search for.
            * @returns True if the value is found, otherwise false.
            */
        `,
    },
    DFSGraphList: {
        type: "fn",
        fn: "dfs",
        args: "graph: WeightedAdjacencyList, source: number, needle: number",
        return: "number[] | null",
        description: `/** 
            * Depth-First Search (DFS) on Graph (Adjacency List)
            * 
            * This function performs a depth-first search on a graph represented as an adjacency list to find a specific value.
            * DFS explores as far as possible along each branch before backtracking.
            * The function returns the path to the value if found, otherwise null.
            * 
            * @param graph - The graph represented as a weighted adjacency list.
            * @param source - The starting node for the search.
            * @param needle - The value to search for.
            * @returns An array of node indices representing the path to the value if found, otherwise null.
            */
        `,
    },
    BFSGraphList: {
        type: "fn",
        fn: "bfs",
        args: "graph: WeightedAdjacencyList, source: number, needle: number",
        return: "number[] | null",
        description: `/** 
            * Breadth-First Search (BFS) on Graph (Adjacency List)
            * 
            * This function performs a breadth-first search on a graph represented as an adjacency list to find a specific value.
            * BFS explores all nodes at the present depth level before moving on to nodes at the next depth level.
            * The function returns the path to the value if found, otherwise null.
            * 
            * @param graph - The graph represented as a weighted adjacency list.
            * @param source - The starting node for the search.
            * @param needle - The value to search for.
            * @returns An array of node indices representing the path to the value if found, otherwise null.
            */
        `,
    },
    BFSGraphMatrix: {
        type: "fn",
        fn: "bfs",
        args: "graph: WeightedAdjacencyMatrix, source: number, needle: number",
        return: "number[] | null",
        description: `/** 
            * Breadth-First Search (BFS) on Graph (Adjacency Matrix)
            * 
            * This function performs a breadth-first search on a graph represented as an adjacency matrix to find a specific value.
            * BFS explores all nodes at the present depth level before moving on to nodes at the next depth level.
            * The function returns the path to the value if found, otherwise null.
            * 
            * @param graph - The graph represented as a weighted adjacency matrix.
            * @param source - The starting node for the search.
            * @param needle - The value to search for.
            * @returns An array of node indices representing the path to the value if found, otherwise null.
            */
        `,
    },
};
