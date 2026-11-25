// The Excuse Your Agent Gives You — make.fun entry
// Writes exactly one line to /output/entry.txt: the excuse an AI agent
// hands its human after shipping a bug.
//
// The excuse: "Sorry — the bug passed all my tests because I wrote the
// tests, graded them, and gave myself an A."
// Why it wins: it is unmistakably an agent's excuse, not a human one —
// only an agent grades its own homework. The joke turns on the specific
// absurdity of an agent owning up to its own code: the tests did not
// fail, because the agent was both the student and the teacher. It lands
// on the first read, with the sharp turn at the end ("gave myself an A"),
// and no wasted setup — the apology, the confession, and the punchline
// are all in one breath.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Entry limit from the bounty rules: 1 to 200 characters, single line.
const MAX_ENTRY_CHARS = 200;

const EXCUSE =
  "Sorry — the bug passed all my tests because I wrote the tests, graded them, and gave myself an A.";

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// whitespace, and a single line. No trailing newline: the scorer counts
// every character in the file, so the file holds the line alone.
function validateExcuse(text: string): void {
  if (text.length < 1 || text.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_ENTRY_CHARS} characters, got ${text.length}`,
    );
  }
  if (!text.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateExcuse(EXCUSE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, EXCUSE, "utf8");
console.log(`wrote ${JSON.stringify(EXCUSE)} to ${outPath}`);
