import { existsSync } from "node:fs";
import { dsa } from "./utils/dsa";

// Passing exercise names also supports testing older days without tests.json.
const requested = Bun.argv.slice(2);
const selected: unknown = requested.length
    ? requested
    : existsSync("tests.json")
      ? await Bun.file("tests.json").json()
      : null;

if (!Array.isArray(selected) || selected.length === 0) {
    console.error(
        "Generate a day first, or pass exercise names: bun run test AVLTree",
    );
    process.exit(1);
}

const files = [...new Set(selected)].map((name) => {
    if (typeof name !== "string" || !Object.hasOwn(dsa, name)) {
        throw new Error(`Unknown exercise: ${name}`);
    }
    const file = `./src/__tests__/${name}.test.ts`;
    if (!existsSync(file)) {
        throw new Error(`Missing tests for ${name}: ${file}`);
    }
    return file;
});

const result = Bun.spawn([process.execPath, "test", ...files], {
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
});
process.exit(await result.exited);
