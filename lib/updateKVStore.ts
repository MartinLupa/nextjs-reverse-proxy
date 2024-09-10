import { kv } from '@vercel/kv';
import { getUrlPatterns } from './urlPatterns';

export async function updateKVStore() {
  const patterns = await getUrlPatterns();

  for (const [path, destination] of Object.entries(patterns)) {
    await kv.set(`rewrite:${path}`, destination);
  }
}