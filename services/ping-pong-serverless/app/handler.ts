import { Handler } from 'aws-lambda'
import { MessageUtil } from './message'

// export { default as producer } from './producer'
// export { default as consumer } from './consumer'

export const hello: Handler = async () =>
  MessageUtil.success({
    happy: true,
    testenv: 'testenv:' + process.env.TESTENV
  })
