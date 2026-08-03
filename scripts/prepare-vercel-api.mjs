// Runs after build-api.mjs during the Vercel build step.
// build-api.mjs bundles api/*.js (inlining src/data/* and stubbing images)
// into dist-api/*.mjs. Vercel's zero-config function detection only looks
// at the api/ folder itself, so we copy the bundled output back over the
// original api/*.js files here, in the ephemeral build container only -
// this never touches what's committed to git, and local dev (which reads
// dist-api/ directly via local-server.js) is unaffected.
import { readdirSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = 'dist-api';
const apiDir = 'api';

if (!existsSync(distDir)) {
  console.error(`Expected ${distDir}/ to exist - did build-api.mjs run first?`);
  process.exit(1);
}

const bundledFiles = readdirSync(distDir).filter((f) => f.endsWith('.mjs'));

if (!bundledFiles.length) {
  console.error(`No bundled files found in ${distDir}/`);
  process.exit(1);
}

for (const file of bundledFiles) {
  const targetName = file.replace(/\.mjs$/, '.js');
  copyFileSync(join(distDir, file), join(apiDir, targetName));
  console.log(`Replaced ${apiDir}/${targetName} with bundled output`);
}

console.log(`Prepared ${bundledFiles.length} API function(s) for Vercel.`);
