// One correction the model found in the draft.
export type Mistake = { original: string; fix: string; reason: string }

// The latest review of the draft shown above the prompt.
export type Review =
  | { kind: 'checking'; draft: string }
  | { kind: 'done'; draft: string; corrected: string; mistakes: Mistake[] }
  | { kind: 'failed'; draft: string; reason: string }

declare module 'claude-code' {
  interface PluginState {
    'prompt-coach': { review: Review | null; isEnabled: boolean }
  }
}
