# prompt-coach

A Claude Code mod, written in TypeScript, that coaches your English while you write prompts.

## Layout

- `.claude-plugin/plugin.json`: mod manifest
- `hooks/hooks.json`: names the hooks module
- `hooks/register.tsx`: the hooks module (`register(on)`)

## Develop

Uses [pnpm](https://pnpm.io) (version pinned in `packageManager`).

```bash
pnpm install          # installs dev tools
pnpm typecheck        # type-check with tsc
pnpm validate         # validate the mod with Claude Code
claude --plugin-dir . # run Claude Code with this mod loaded
```

The engine writes the API types into `.claude-plugin/types/` the first time it loads the mod; `tsc -p .` reads them from there.
