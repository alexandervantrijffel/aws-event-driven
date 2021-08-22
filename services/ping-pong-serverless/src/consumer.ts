import { KinesisStreamHandler, KinesisStreamRecordPayload, KinesisStreamEvent, Context } from 'aws-lambda'
import { inspect } from 'util'
import logger from './log'
import 'source-map-support/register'

// todo test with
// localstack_main_2 | 2021-08-22T07:16:25:DEBUG:localstack.utils.run: Executing command: node -e 'require("/tmp/localstack/zipfile.6dd036c9/src/consumer.js").handler({"Records": [{"eventID": "shardId-000000000000:49621323405220079564832311597539461818206679609345310722", "eventSourceARN": "arn:aws:kinesis:us-east-1:000000000000:stream/eventStream", "eventSource": "aws:kinesis", "eventVersion": "1.0", "eventName": "aws:kinesis:record", "invokeIdentityArn": "arn:aws:iam::000000000000:role/lambda-role", "awsRegion": "us-east-1", "kinesis": {"approximateArrivalTimestamp": 1629616585.6315353, "data": "eyJoYXBweWhhcHAiOnRydWV9", "partitionKey": "e0ebf433-2aa1-471e-9d15-ee0178bac297", "sequenceNumber": "49621323405220079564832311597539461818206679609345310722"}}]},{"function_name": "myService-local-consumer", "function_version": "$LATEST", "client_context": null, "invoked_function_arn": "arn:aws:lambda:us-east-1:000000000000:function:myService-local-consumer", "cognito_identity": null, "aws_request_id": "eb66b79b-7552-4173-b1ae-5b3b89b3b3bc", "memory_limit_in_mb": 1024, "log_group_name": "/aws/lambda/myService-local-consumer", "log_stream_name": "2021/08/22/[1]7ae39f57"}).then(r => process.stdout.write(JSON.stringify(r)))'

export const handler: KinesisStreamHandler = async (event: KinesisStreamEvent, _context: Context, _callback) => {
  try {
    if (!event.Records) {
      logger.error('no records in event!', {
        inspected: inspect(event),
        stringified: JSON.stringify(event)
      })
      return
    }
    for (const record of event.Records) {
      const payload: KinesisStreamRecordPayload = record.kinesis
      const message: string = Buffer.from(payload.data, 'base64').toString()

      logger.info(
        `Kinesis Message:
          data: ${message}
          partitionKey: ${payload.partitionKey}
          sequenceNumber: ${payload.sequenceNumber}
          kinesis schema version: ${payload.kinesisSchemaVersion}
          approximateArrivalTimestamp: ${payload.approximateArrivalTimestamp}
        `
      )

      // Do something
      //
    }
  } catch (error) {
    logger.error(error)
    throw new Error(error)
  }
}
