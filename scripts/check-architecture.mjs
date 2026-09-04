import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const sourceRoot = join(process.cwd(), "src");
const sourceFiles = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (/\.(css|ts|tsx)$/.test(entry.name)) sourceFiles.push(path);
  }
}

await collect(sourceRoot);

const violations = [];
for (const path of sourceFiles) {
  const source = await readFile(path, "utf8");
  if (source.includes('href="#"')) {
    violations.push(`${path}: dead href="#"`);
  }
  if (source.includes('target="_blank"') && !source.includes('rel="noopener noreferrer"')) {
    violations.push(`${path}: external target needs rel="noopener noreferrer"`);
  }
}

if (violations.length > 0) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log(`Architecture checks passed (${sourceFiles.length} source files).`);
