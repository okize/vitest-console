import type { MatcherState } from '@vitest/expect'

import { type ConsoleMethod } from '../libs/console'
import { getConsoleMock } from '../libs/mock'
import { getResult } from '../libs/result'

export function createToHaveTimesMatcher(method: ConsoleMethod) {
  return function (this: MatcherState, received: Console, expectedTimes: number) {
    const { isNot } = this

    const receivedMock = getConsoleMock(received, method)

    if (receivedMock.error) {
      return receivedMock.error
    }

    return getResult(
      receivedMock.mock.mock.calls.length === expectedTimes,
      `Expected 'console.${method}' to ${isNot ? 'not ' : ''}be called ${expectedTimes} times but it was called ${
        receivedMock.mock.mock.calls.length
      } times`
    )
  }
}
