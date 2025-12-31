import fs from "fs";

const requiredFiles = [
  "dist/balanceui.es.js",
  "dist/balanceui.cjs.js",
  "dist/index.types.d.ts",
  "dist/index.css",
  "dist/theme/theme-contract.css",
  "dist/theme/design-tokens.css",
];

const requiredDirs = [
  "dist/components",
  "dist/theme",
];

let failed = false;

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing file: ${file}`);
    failed = true;
  }
}

for (const dir of requiredDirs) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Missing directory: ${dir}`);
    failed = true;
  }
}

if (failed) {
  console.error("\n⛔ Dist validation failed.");
  process.exit(1);
}

console.log("✅ Dist validation passed.");
