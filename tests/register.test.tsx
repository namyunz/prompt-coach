import type { EventOf, ResultOf } from 'claude-code'
import { expect, mock, test } from 'claude-code/testing'

// The engine raises prompt.edit and prompt.change itself; the test's `$` carries no typing for them.
type PromptEvents = {
  prompt: {
    edit: (e: EventOf['prompt.edit']) => Promise<ResultOf['prompt.edit']>
    change: (e: EventOf['prompt.change']) => Promise<ResultOf['prompt.change']>
  }
}

const BAND = {
  plugin: 'prompt-coach',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false,
    isWorking: false,
    maxRows: 20,
    bodyColumns: 80,
    scroll: { offset: 0, bodyRows: 20 },
    view: {},
  },
} as const

const DRAFT = 'Please fix the bug that make test fail'
const REPLY = JSON.stringify({
  corrected: 'Please fix the bug that makes the tests fail',
  mistakes: [
    { original: 'make test fail', fix: 'makes the tests fail', reason: '주어가 단수입니다' },
  ],
})

test('a typed English draft gets its corrections drawn above the prompt', async ($, on) => {
  const clock = mock.clock(on)
  // These hooks stand in for the engine and the model.
  on('prompt.edit', (_, e) => ({ text: e.text + e.inputText, cursor: e.text.length + 1 }))
  on('model.complete', () => ({
    value: {
      isAnswered: true,
      text: REPLY,
      usage: {
        input_tokens: 1,
        output_tokens: 1,
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0,
      },
    },
  }))

  await ($ as unknown as PromptEvents).prompt.edit({
    origin: { kind: 'composer' },
    text: DRAFT.slice(0, -1),
    cursor: DRAFT.length - 1,
    start: DRAFT.length - 1,
    end: DRAFT.length - 1,
    inputText: DRAFT.slice(-1),
  })
  await clock.advance(1500)

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...BAND, surface })
    expect((await ui.find({ type: 'Text', text: /makes the tests fail$/ }))?.text).toBe(
      'Please fix the bug that makes the tests fail',
    )
    expect(await ui.find({ type: 'Text', text: /주어가 단수/ })).toBeDefined()
    await ui.unmount()
  }
})

test('a Korean draft is left alone', async ($, on) => {
  mock.clock(on)
  on('prompt.change', (_, e) => ({ text: e.text }))
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)

    return <Text>engine</Text>
  })

  await ($ as unknown as PromptEvents).prompt.change({
    origin: { kind: 'engine' },
    text: '이 버그 좀 고쳐 주세요 부탁드립니다',
    cursor: 0,
  })

  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect((await ui.find({ type: 'Text' }))?.text).toBe('engine')
  await ui.unmount()
})
