# Reverse Proxy

This is a reverse proxy that allows you to rewrite paths to different destinations.

It's deployed on Vercel and uses the `next/server` API to handle the requests.

The rewrites are stored in Vercel KV for easy management.

Teams can manage their rewrites by adding a file `*.json` file to the `manual-patterns` directory.

The file should be formatted as a JSON array of objects with the following properties:

- `path`: The path to rewrite.
- `destination`: The destination to rewrite to.

For example:    

```json
[
  {
    "path": "/example-path",
    "destination": "https://example-destination.com"
  }
]
```

The rewrites will be automatically updated when the app is deployed.

