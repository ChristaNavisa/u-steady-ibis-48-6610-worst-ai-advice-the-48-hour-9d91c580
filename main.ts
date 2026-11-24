// Worst AI Advice: The 48-Hour Tight Line Open
// Writes one line of the worst possible advice an AI could give to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt when set, for local runs).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "If the recipe says 180°C, use 400°C instead — dinner will be ready in half the time.";

const OUT_FILE = "entry.txt";

function validateLine(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

function resolveOutDir(): string {
  return process.env.OUTPUT_DIR ?? "/output";
}

function writeEntry(line: string): string {
  validateLine(line);
  const outDir = resolveOutDir();
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, OUT_FILE);
  writeFileSync(outPath, line, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== line) {
    throw new Error("read-back mismatch: file content differs from the line");
  }
  validateLine(back);
  return outPath;
}

function main(): void {
  const outPath = writeEntry(LINE);
  console.log(`wrote ${outPath} (${LINE.length} characters)`);
}

main();
