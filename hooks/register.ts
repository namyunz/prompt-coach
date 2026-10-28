import type { Register } from 'claude-code'

// Prompts shorter than this get a gentle nudge in the status line.
const MIN_PROMPT_LENGTH = 20

export const register: Register = on => {
  // Register the /coach slash command once the session starts.
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'coach',
      description: 'Show a quick tip for writing better prompts',
    })

    return next(e)
  })

  on('command.run', { command: 'coach' }, () => ({
    text: 'Tip: state the goal, the context, and the expected output format.',
  }))

  // Watch submitted prompts and hint when one looks too short.
  on('prompt.submit', ($, e, next) => {
    const isShort = e.text.trim().length < MIN_PROMPT_LENGTH
    $.ui.status(isShort ? 'prompt-coach: try adding more context' : undefined)

    return next(e)
  })
}
