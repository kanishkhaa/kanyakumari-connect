import { build } from 'esbuild';
import { readdirSync } from 'fs';

const apiFiles = readdirSync('api').filter((f) => f.endsWith('.js'));

await build({
  entryPoints: apiFiles.map((f) => `api/${f}`),
  outdir: 'dist-api',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  loader: {
    '.jpg': 'empty',
    '.jpeg': 'empty',
    '.png': 'empty',
    '.svg': 'empty',
    '.webp': 'empty',
    '.gif': 'empty',
    '.avif': 'empty',
    '.ico': 'empty',
  },
  outExtension: { '.js': '.mjs' },
});

console.log('API bundled to dist-api/');