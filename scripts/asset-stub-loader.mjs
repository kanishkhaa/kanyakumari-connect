// Intercepts image/asset imports so Node can load .ts data files
// that import images (which Vite handles, but plain Node can't).
const ASSET_RE = /\.(jpg|jpeg|png|svg|webp|gif|avif|ico)$/i;

export async function resolve(specifier, context, nextResolve) {
  if (ASSET_RE.test(specifier)) {
    return { url: 'asset-stub:' + specifier, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('asset-stub:')) {
    return {
      format: 'module',
      source: 'export default "";',
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}