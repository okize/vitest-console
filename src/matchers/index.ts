import type { MatchersObject, MatcherState } from '@vitest/expect'

import type { ConsoleMethod } from '../libs/console'

import { createToHaveMatcher } from './toHave'
import { createToHaveLastWithMatcher } from './toHaveLastWith'
import { createToHaveNthWithMatcher } from './toHaveNthWith'
import { createToHaveTimesMatcher } from './toHaveTimes'
import { createToHaveWithMatcher } from './toHaveWith'

export const MATCHERS_DEFINITIONS = [
  { method: 'error', name: 'Errored' },
  { method: 'info', name: 'Informed' },
  { method: 'log', name: 'Logged' },
  { method: 'warn', name: 'Warned' },
] as const

export function createMatchers(): MatchersObject<MatcherState> {
  const matchers: MatchersObject = {}

  for (const definition of MATCHERS_DEFINITIONS) {
    matchers[`toHave${definition.name}`] = createToHaveMatcher(definition.method)
    matchers[`toHave${definition.name}Times`] = createToHaveTimesMatcher(definition.method)
    matchers[`toHave${definition.name}With`] = createToHaveWithMatcher(definition.method)
    matchers[`toHaveLast${definition.name}With`] = createToHaveLastWithMatcher(definition.method)
    matchers[`toHaveNth${definition.name}With`] = createToHaveNthWithMatcher(definition.method)
  }

  return matchers
}

export type Matcher<T extends (method: ConsoleMethod) => (...args: any[]) => unknown> = Parameters<
  ReturnType<T>
> extends [unknown, ...infer U]
  ? (...args: U) => void
  : () => void
