import { Handler } from 'aws-lambda'
import { MessageUtil } from './message'

export const handler: Handler = async () =>
  MessageUtil.success({
    happy: true,
    testenv: 'testenv:' + process.env.TESTENV
  })
