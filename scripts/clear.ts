import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { src_path, stats_path } from "./utils/constants";

try {
    readdirSync(src_path)
        .filter((f) => {
            if (f.includes("day")) {
                console.log("found", f);
                return true;
            }
            console.log("ignoring", f);
            return false;
        })
        .forEach((f) => {
            const file = join(src_path, f);
            console.log("deleting", file);
            rmSync(file, {
                recursive: true,
                force: true,
            });
        });

    rmSync("tests.json", { force: true });

    console.log("deleting stats");
    rmSync(stats_path, {
        recursive: true,
        force: true,
    });
} catch (e) {
    console.log(e);
}
