import { createClient } from "contentful";
import fs from "fs";
import path from "path";

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT!,
});

export async function getUrlPatterns() {
  const patterns: Record<string, string> = {};

  // Read manual patterns from JSON files
  const manualPatternsDir = path.join(process.cwd(), "manual-patterns");
  const files = fs.readdirSync(manualPatternsDir);
  for (const file of files) {
    if (file.endsWith(".json")) {
      const content = fs.readFileSync(
        path.join(manualPatternsDir, file),
        "utf-8"
      );
      Object.assign(patterns, JSON.parse(content));
    }
  }

  // Fetch patterns from Contentful
  const entries = await contentfulClient.getEntries({
    content_type: "urlPattern",
  });
  for (const entry of entries.items) {
    patterns[entry.fields.path as string] = entry.fields.destination as string;
  }

  return patterns;
}
