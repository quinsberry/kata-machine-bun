## Developed live on twitch

[ThePrimeagen](https://twitch.tv/ThePrimeagen)

## Naming

### Lig-Machine

Lengthy Instrumentation Generating Massive Anticompetitive Computational Help for Intermediate Coders // n9

### Ligmata

Literal Improvement Gaining Master and Tutelage on Algorithms Let's Intelligently Generate Multiple Algorithm Training Assessments // permdaddy

### Sugma Nuts

Studious Users Get Major Abilities. New Useful Training for Students

### Ligma Farts

Learn Intermediate Groundbreaking Massive Algorithms. Free Algorithm Research & Training System

### If you have a suggestion

make an issue and we will come up with the potential name.

### Supported Algorithms

The Part 1 and Part 2 lists match the CLI course presets. Shared exercises appear in both parts.

#### Part 1

- Linear Search
- Binary Search
- Two Crystal Balls Problem
- Bubble Sort
- Maze Solver
- Quick Sort
- Pre-Order Traversal (Binary Tree)
- Post-Order Traversal (Binary Tree)
- Breadth-First Search (Binary Tree)
- Depth-First Search (Binary Search Tree)
- Compare Binary Trees
- Breadth-First Search (Adjacency Matrix)
- Depth-First Search (Adjacency List)
- Dijkstra's Shortest Path (Adjacency List)

#### Part 2

- Depth-First Search (Binary Search Tree)
- Pre-Order Traversal (Binary Tree)
- In-Order Traversal (Binary Tree)
- Post-Order Traversal (Binary Tree)
- Breadth-First Search (Adjacency Matrix)
- Breadth-First Search (Adjacency List)
- Depth-First Search (Adjacency List)
- Topological Sort
- Prim's Minimum Spanning Tree (Adjacency List)
- Dijkstra's Shortest Path (Adjacency List)
- Kruskal's Minimum Spanning Tree (Adjacency List)
- Ford–Fulkerson (Maximum Flow and Minimum Cut)
- Factorial
- Fibonacci
- Maximum Subarray
- Coin Change (Counting Combinations)

#### Additional Algorithms

Available through **All** or manual configuration:

- Insertion Sort
- Merge Sort

### Supported Data Structures

#### Part 1

- Singly Linked List
- Doubly Linked List
- Queue
- Stack
- Array List
- Ring Buffer
- Min Heap
- Trie
- Map
- LRU Cache

#### Part 2

- Binary Search Tree
- AVL Tree
- B-Tree
- Min Heap
- Indexed Min Heap
- Union-Find
- Bloom Filter

### How It Works

Make sure you have [Bun](https://bun.sh/) and bun installed.

clone the repo and install the dependencies

```bash
bun install
```

### 1. Using CLI

Run the `cli` command and choose the options

```bash
bun run cli
```

### 2. Manualy

edit the `ligma.config.ts` file

```typescript
export const config: LigmaConfig = {
    dsa: [
        "InsertionSort",
        "MergeSort",
        "Queue",
        "Stack",
        "QuickSort",
        "DijkstraList",
        "PrimsList",
        ...
    ],
}
```

create a day of katas, this will use the list in the `ligma.config.ts`.

```bash
bun generate
```

this will progressively create folders named

```
src/day1
src/day2
...
```

`bun generate` will also update the `tsconfig.json` to point the latest `day` folder via tspaths. This allows us to avoid updating anything for testing each day.

#### Testing

```bash
bun run test
# Run one exercise from the current day:
bun run test AVLTree
```

Generation writes an ignored `tests.json` containing the selected exercises. `bun run test` runs only their test files against the latest day via `@code/*`. Passing exercise names overrides that selection. `bun test` runs every discovered test, so it requires a day containing every exercise.
