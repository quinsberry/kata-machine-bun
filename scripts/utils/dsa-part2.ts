import type { AlgorythmStructure } from "./AlgorythmGenerator";

// These are exercise contracts, not solutions. Shared Part 1 exercises live in dsa.ts.
export const part2 = {
    BinarySearchTree: {
        type: "class",
        properties: [
            {
                name: "root",
                type: "BinaryNode<number> | null",
                scope: "public",
            },
        ],
        methods: [
            { name: "insert", args: "value: number", return: "void" },
            { name: "delete", args: "value: number", return: "boolean" },
            { name: "has", args: "value: number", return: "boolean" },
        ],
        description: `/** Binary search tree of distinct finite numbers.
 * Start with root = null. Ignore duplicate insertions. delete returns whether a key existed.
 * Preserve strict BST ordering; handle leaf, one-child, two-child and root deletion.
 */`,
    },
    AVLTree: {
        type: "class",
        properties: [
            {
                name: "root",
                type: "BinaryNode<number> | null",
                scope: "public",
            },
        ],
        methods: [
            { name: "insert", args: "value: number", return: "void" },
            { name: "delete", args: "value: number", return: "boolean" },
            { name: "has", args: "value: number", return: "boolean" },
        ],
        description: `/** AVL tree of distinct finite numbers. Same contract as BinarySearchTree.
 * After every insertion/deletion, subtree heights differ by at most one at every node.
 * Practice LL, RR, LR and RL rotations; target O(log n) search, insertion and deletion.
 * You may keep height metadata internally; the public root is inspectable for invariant tests.
 */`,
    },
    BTree: {
        type: "class",
        args: "minimumDegree: number",
        properties: [{ name: "root", type: "BTreeNode", scope: "public" }],
        methods: [
            { name: "insert", args: "value: number", return: "void" },
            { name: "delete", args: "value: number", return: "boolean" },
            { name: "has", args: "value: number", return: "boolean" },
        ],
        description: `/** B-tree of distinct finite numbers; an M-way search tree with bounded occupancy.
 * minimumDegree t must be an integer >= 2, otherwise throw RangeError.
 * Nodes have at most 2t-1 keys; non-root nodes have at least t-1 keys.
 * Internal nodes have keys.length+1 children; leaves have children = []. All leaves share a depth.
 * Empty root is { keys: [], children: [] }. Ignore duplicates; delete reports whether found.
 * Practice splitting, promotion, borrowing, merging, internal deletion and shrinking the root.
 */`,
    },
    UnionFind: {
        type: "class",
        args: "size: number",
        methods: [
            { name: "find", args: "item: number", return: "number" },
            { name: "union", args: "a: number, b: number", return: "boolean" },
            {
                name: "connected",
                args: "a: number, b: number",
                return: "boolean",
            },
        ],
        description: `/** Disjoint sets over indices 0..size-1.
 * Throw RangeError for a non-integer/negative size or an out-of-range/non-integer index.
 * union returns true only when two different components merge. Representatives are unspecified.
 * Use path compression and union by rank or size for near-constant amortized operations.
 */`,
    },
    IndexedMinHeap: {
        type: "class",
        properties: [{ name: "length", type: "number", scope: "public" }],
        methods: [
            {
                name: "insert",
                args: "key: number, priority: number",
                return: "void",
            },
            {
                name: "update",
                args: "key: number, priority: number",
                return: "void",
            },
            {
                name: "delete",
                return: "{ key: number; priority: number } | undefined",
            },
            { name: "has", args: "key: number", return: "boolean" },
        ],
        description: `/** Indexed min-priority queue with unique numeric keys and finite priorities.
 * Start with length = 0. insert throws Error for an existing key; update throws for a missing key.
 * update can increase or decrease priority. delete removes the minimum, or returns undefined.
 * Ties may be removed in any order. Maintain a key-to-position index; target O(log n) mutations.
 */`,
    },
    TopologicalSort: {
        type: "fn",
        fn: "topological_sort",
        args: "graph: AdjacencyList",
        return: "number[] | null",
        description: `/** Return every vertex of a directed graph in topological order, or null on a cycle.
 * Vertex indices are valid; include isolated vertices. Empty graph returns []. Any valid order works.
 * Practice DFS finishing order and cycle detection. Target O(V+E).
 */`,
    },
    KruskalList: {
        type: "fn",
        fn: "kruskal",
        args: "graph: WeightedAdjacencyList",
        return: "WeightedAdjacencyList | null",
        description: `/** Minimum spanning tree of an undirected weighted graph with valid vertex indices.
 * Input edges are symmetric. Output edges must also be symmetric. Do not mutate the input.
 * Empty graph returns []; disconnected nonempty graph returns null. Ignore self-loops.
 * Ties allow multiple valid MSTs; negative weights are allowed. Sort edges and use union-find.
 */`,
    },
    FordFulkerson: {
        type: "fn",
        fn: "ford_fulkerson",
        args: "capacities: WeightedAdjacencyMatrix, source: number, sink: number",
        return: "FlowResult",
        description: `/** Maximum flow and minimum cut of a directed capacity network.
 * Matrix must be square with finite nonnegative integer capacities (0 means no edge).
 * source/sink must be distinct valid integer indices. Invalid input throws RangeError.
 * Return { maxFlow, minCut }, where minCut lists vertices reachable from source in the final residual graph.
 * Do not mutate capacities. Include reverse residual edges so earlier flow can be rerouted.
 */`,
    },
    Factorial: {
        type: "fn",
        fn: "factorial",
        args: "n: number",
        return: "number",
        description: `/** Return n! with 0! = 1. Accept integers 0..18; otherwise throw RangeError.
 * This is a recurrence warm-up for dynamic programming. Avoid unnecessary recursive storage.
 */`,
    },
    Fibonacci: {
        type: "fn",
        fn: "fibonacci",
        args: "n: number",
        return: "number",
        description: `/** Return F(n) with F(0)=0 and F(1)=1. Accept integers 0..78; otherwise throw RangeError.
 * Reuse previous results instead of exponential recursion; target O(n) time, O(1) extra space.
 */`,
    },
    MaxSubarray: {
        type: "fn",
        fn: "max_subarray",
        args: "values: number[]",
        return: "number",
        description: `/** Maximum sum of a nonempty contiguous subarray of finite numbers.
 * Empty input returns 0. All-negative input returns its largest element. Do not mutate input.
 * Use previous results to compute the next result; target O(n) time and O(1) space.
 */`,
    },
    CoinChange: {
        type: "fn",
        fn: "coin_change",
        args: "coins: number[], amount: number",
        return: "number",
        description: `/** Count unordered combinations making amount with unlimited coins of each denomination.
 * Ignore duplicate denominations. amount=0 returns 1; an impossible amount returns 0.
 * Throw RangeError unless amount is a nonnegative integer and all coins are positive integers.
 * Inputs/results fit safe integers; do not mutate coins. Target O(uniqueCoins * amount) time.
 */`,
    },
    BloomFilter: {
        type: "class",
        args: "bitCount: number, hashes: ((value: string) => number)[]",
        methods: [
            { name: "add", args: "value: string", return: "void" },
            { name: "has", args: "value: string", return: "boolean" },
        ],
        description: `/** Bloom filter of strings using a bit array and injected deterministic integer hash functions.
 * bitCount must be a positive integer and hashes must be nonempty; otherwise throw RangeError.
 * Normalize negative hashes into 0..bitCount-1. add sets every hash bit; has checks every bit.
 * False positives are allowed; inserted strings must never produce false negatives.
 * No deletion. Hash injection makes collision behavior reproducible in tests.
 */`,
    },
} satisfies Record<string, AlgorythmStructure>;
