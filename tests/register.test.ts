import { expect, test } from 'claude-code/testing'

test('/coach answers with a tip', async ($, on) => {
  // Nothing sits beneath the plugin: these hooks stand in for the engine.
  on('command.register', () => ({ value: { command: 'coach' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  const ran = await $.command.run({
    command: 'coach',
    args: '',
    origin: { kind: 'composer' },
    presentation: { isFullscreen: false, columns: 80 },
  })

  expect(ran.text).toMatch(/Tip:/)
})
