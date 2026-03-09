# Platform Manifests

## MCP configuration (`mcp.json`)

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

## Azure Static Web Apps SPA routing (`staticwebapp.config.json`)

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/*.css", "/*.js", "/*.png", "/*.jpg", "/*.jpeg", "/*.svg", "/*.webp"]
  }
}
```
