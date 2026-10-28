# prompt-coach

A Claude Code mod, written in TypeScript, that coaches your English while you write prompts.

## Layout

- `.claude-plugin/plugin.json`: mod manifest
- `hooks/hooks.json`: names the hooks module
- `hooks/register.tsx`: the hooks module (`register(on)`)

## Develop

Uses [pnpm](https://pnpm.io) (version pinned in `packageManager`).

```bash
pnpm install          # installs dev tools and sets up git hooks
pnpm check            # typecheck + lint + format check + validate
pnpm lint:fix         # auto-fix lint issues
pnpm format           # format with Prettier
claude --plugin-dir . # run Claude Code with this mod loaded
```

The engine writes the API types into `.claude-plugin/types/` the first time it loads the mod; `tsc -p .` reads them from there.

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org) (`feat: ...`, `fix: ...`, `chore: ...`). Git hooks (husky) enforce it:

- `commit-msg`: commitlint with `@commitlint/config-conventional`
- `pre-commit`: `pnpm typecheck`, `pnpm lint` and `pnpm format:check`
