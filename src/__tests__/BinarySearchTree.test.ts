import BinarySearchTree from "@code/BinarySearchTree";
import { describe } from "bun:test";
import { searchTreeTests } from "./data/SearchTreeTest";
describe("BinarySearchTree", () =>
    searchTreeTests(() => new BinarySearchTree()));
