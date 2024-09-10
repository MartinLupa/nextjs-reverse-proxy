import { kv } from '@vercel/kv';

async function getRewrites() {
  const keys = await kv.keys('rewrite:*');

  return Promise.all(keys.map(async (key) => {
    const value = await kv.get(key);
      return {
        path: key.replace('rewrite:', ''),
        destination: value as string,
      };
    })
  );
}

export default async function Home() {
  const rewrites = await getRewrites();

  return (
    <main>
      <h1>Reverse Proxy</h1>
      <p>Status: Active</p>
      <h2>Current Rewrites:</h2>
      <ul>
        {rewrites.map(({ path, destination }) => (
          <li key={path}>
            {path} → {destination}
          </li>
        ))}
      </ul>
    </main>
  );
}
