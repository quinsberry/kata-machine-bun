import { AlgorythmStructure } from "./AlgorythmGenerator";

export type LigmaConfig = {
    dsa: Algorythm[];
};

export type Algorythm = [
    "BinarySearchTree",
    "AVLTree",
    "BTree",
    "UnionFind",
    "IndexedMinHeap",
    "TopologicalSort",
    "KruskalList",
    "FordFulkerson",
    "Factorial",
    "Fibonacci",
    "MaxSubarray",
    "CoinChange",
    "BloomFilter",
    "DFSOnBST",
    "LRU",
    "LinearSearchList",
    "BinarySearchList",
    "TwoCrystalBalls",
    "BubbleSort",
    "SinglyLinkedList",
    "DoublyLinkedList",
    "Queue",
    "Stack",
    "ArrayList",
    "MazeSolver",
    "QuickSort",
    "BTPreOrder",
    "BTInOrder",
    "BTPostOrder",
    "BTBFS",
    "CompareBinaryTrees",
    "DFSGraphList",
    "Trie",
    "BFSGraphMatrix",
    "BFSGraphList",
    "Map",
    "MinHeap",
    "DijkstraList",
    "InsertionSort",
    "MergeSort",
    "RingBuffer",
    "PrimsList",
][number];

export type DSA = Record<Algorythm, AlgorythmStructure>;
