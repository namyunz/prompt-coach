# prompt-coach

A Claude Code mod, written in TypeScript, that coaches you on writing better prompts.

## What it does

- `/coach` slash command: shows a quick tip for writing clear prompts.
- Status line hint: when a submitted prompt looks too short, the status line suggests adding more context.

## Layout

- `.claude-plugin/plugin.json`: mod manifest
- `hooks/hooks.json`: names the hooks module
- `hooks/register.ts`: the hooks module (`register(on)`)
- `tests/`: tests run by `claude plugin test`

## Develop

```bash
npm install        # TypeScript for type-checking
npm run check      # typecheck + validate + test
claude --plugin-dir .   # run Claude Code with this mod loaded
```

The engine writes the API types into `.claude-plugin/types/` the first time it loads the mod; `tsc -p .` reads them from there.
