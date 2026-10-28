# prompt-coach

A Claude Code mod, written in TypeScript, that coaches your English while you type a prompt.

## What it does

- While you type an English prompt, it waits until you pause (about 1.2 seconds), then asks a small model (Haiku) to review the draft.
- A band above the prompt box shows a more natural rewrite of the whole draft and each mistake as `original → fix` with a short explanation in Korean.
- "Use corrected" puts the rewrite into the prompt box; "Dismiss" hides the band.
- Drafts that are short, mostly non-English, or slash commands are skipped.
- `/coach` turns the coach on or off.

Each check is one Haiku call billed to your Claude Code credentials.

## Layout

- `.claude-plugin/plugin.json`: mod manifest
- `hooks/hooks.json`: names the hooks module
- `hooks/register.tsx`: the hooks module (`register(on)`)
- `types/index.d.ts`: the mod's `$.state` contract
- `tests/`: tests run by `claude plugin test`

## Develop

Uses [pnpm](https://pnpm.io) (version pinned in `packageManager`).

```bash
pnpm install          # installs dev tools and sets up git hooks
pnpm check            # typecheck + lint + format check + validate + test
pnpm lint:fix         # auto-fix lint issues
pnpm format           # format with Prettier
claude --plugin-dir . # run Claude Code with this mod loaded
```

The engine writes the API types into `.claude-plugin/types/` the first time it loads the mod; `tsc -p .` reads them from there.

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org) (`feat: ...`, `fix: ...`, `chore: ...`). Git hooks (husky) enforce it:

- `commit-msg`: commitlint with `@commitlint/config-conventional`
- `pre-commit`: `pnpm typecheck`, `pnpm lint` and `pnpm format:check`
