import 'vitest'

import type { Matchers } from '../src/index'

declare module 'vitest' {
  interface Assertion extends Matchers {}
  interface AsymmetricMatchersContaining extends Matchers {}
}
