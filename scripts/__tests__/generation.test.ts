import { expect, test } from "bun:test";
import { cpSync, mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, basename } from "node:path";
import {
    allAlgorithms,
    theLastAlgorithmsCourseYoullNeedPart1,
    theLastAlgorithmsCourseYoullWantPart2,
} from "../utils/algorythms";

test("course presets generate separate days and run only selected tests", async () => {
    const root = resolve(import.meta.dir, "../..");
    const project = mkdtempSync(join(tmpdir(), "kata-part2-"));
    async function run(args: string[]) {
        const result = Bun.spawn([process.execPath, ...args], {
            cwd: project,
            stdout: "pipe",
            stderr: "pipe",
        });
        const [code, stdout, stderr] = await Promise.all([
            result.exited,
            new Response(result.stdout).text(),
            new Response(result.stderr).text(),
        ]);
        return { code, output: stdout + stderr };
    }
    try {
        for (const name of ["scripts", "src"]) {
            cpSync(join(root, name), join(project, name), {
                recursive: true,
                filter: (path) => !/^day\d+$/.test(basename(path)),
            });
        }
        for (const name of ["package.json", "tsconfig.json"]) {
            cpSync(join(root, name), join(project, name));
        }
        symlinkSync(join(root, "node_modules"), join(project, "node_modules"));
        const beforeGeneration = await run(["run", "test"]);
        expect(beforeGeneration.code).toBe(1);
        expect(beforeGeneration.output).toContain("Generate a day first");
        const presets = [
            theLastAlgorithmsCourseYoullNeedPart1,
            theLastAlgorithmsCourseYoullWantPart2,
            allAlgorithms,
        ];
        for (const [index, preset] of presets.entries()) {
            await Bun.write(
                join(project, "ligma.config.ts"),
                `export const config = ${JSON.stringify({ dsa: preset })};`,
            );
            const generated = await run(["run", "generate"]);
            expect(generated.code, generated.output).toBe(0);
            expect(await Bun.file(join(project, "tests.json")).json()).toEqual(
                preset,
            );
            const config = await Bun.file(
                join(project, "tsconfig.json"),
            ).json();
            expect(config.compilerOptions.paths["@code/*"]).toEqual([
                `./src/day${index + 1}/*`,
            ]);
            for (const name of preset) {
                const content = await Bun.file(
                    join(project, `src/day${index + 1}/${name}.ts`),
                ).text();
                expect(content).toContain("Not implemented");
                expect(
                    await Bun.file(
                        join(project, `src/__tests__/${name}.test.ts`),
                    ).exists(),
                ).toBe(true);
            }
            if (index === 1) {
                const starters = await run(["run", "test"]);
                expect(starters.code).not.toBe(0);
                expect(starters.output).toContain("Not implemented");
                expect(starters.output).not.toContain("Cannot find module");
                expect(starters.output).not.toContain("BubbleSort.test.ts");
                await Bun.write(
                    join(project, "src/day2/Factorial.ts"),
                    `export default function factorial(n: number): number {
                    if (!Number.isInteger(n) || n < 0 || n > 18) throw new RangeError();
                    let value = 1; for (let i = 2; i <= n; i++) value *= i; return value;
                }`,
                );
                const individual = await run(["run", "test", "Factorial"]);
                expect(individual.code, individual.output).toBe(0);
                expect(
                    (await run(["run", "test", "NotAnExercise"])).code,
                ).not.toBe(0);
            }
        }
        expect(
            await Bun.file(join(project, "src/day1/Queue.ts")).exists(),
        ).toBe(true);
        const lint = await run(["run", "lint"]);
        expect(lint.code, lint.output).toBe(0);
        const cleared = await run(["run", "clear"]);
        expect(cleared.code, cleared.output).toBe(0);
        expect(await Bun.file(join(project, "tests.json")).exists()).toBe(
            false,
        );
    } finally {
        rmSync(project, { recursive: true, force: true });
    }
}, 30_000);
