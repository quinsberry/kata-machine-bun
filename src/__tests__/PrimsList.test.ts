import prims from "@code/PrimsList";
import { circleList1 } from "./data/graph";
import { checkMST, tiedGraph } from "./data/MSTTest";
import { test } from "bun:test";

test("Prim finds a minimum spanning tree; edge order and ties are unrestricted", () => {
    checkMST(circleList1, prims(circleList1), 9);
    checkMST(tiedGraph, prims(tiedGraph), 2);
    checkMST([[]], prims([[]]), 0);
});
