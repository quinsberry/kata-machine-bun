#!/usr/bin/env node
import { select } from "@inquirer/prompts";
import { generateAlgorithms } from "./utils/generateAlgorithms";
import {
    allAlgorithms,
    theLastAlgorithmsCourseYoullNeedPart1,
    theLastAlgorithmsCourseYoullWantPart2,
} from "./utils/algorythms";

async function run() {
    const answer = await select({
        message: "What algorithms do you want to generate?",
        choices: [
            {
                value: theLastAlgorithmsCourseYoullNeedPart1,
                short: "Part 1",
                name: "The last algorithms course you'll need (Part 1)",
            },
            {
                value: theLastAlgorithmsCourseYoullWantPart2,
                short: "Part 2",
                name: "The last algorithms course you'll want (Part 2)",
            },
            {
                value: allAlgorithms,
                name: "All",
            },
        ],
    });

    await generateAlgorithms({ dsa: answer });

    console.log("Done.");
}

run();
