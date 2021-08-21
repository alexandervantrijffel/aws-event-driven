import { KinesisStreamHandler, KinesisStreamRecordPayload } from 'aws-lambda'
import { inspect } from 'util'

// todo make sure this npm package is added to the function zip package
// and re-enable this one
// import 'source-map-support/register'

export const handler: KinesisStreamHandler = async (event, _context, _callback) => {
  try {
    if (!event.Records) {
      console.error('no records in event!', {
        inspected: inspect(event),
        stringified: JSON.stringify(event)
      })
      return
    }
    for (const record of event.Records) {
      const payload: KinesisStreamRecordPayload = record.kinesis
      const message: string = Buffer.from(payload.data, 'base64').toString()
      console.log('payload', { payload })
      console.log('message', message)

      console.log(
        `Kinesis Message:
          partition key: ${payload.partitionKey}
          sequence number: ${payload.sequenceNumber}
          data: ${message}
          kinesis schema version: ${payload.kinesisSchemaVersion}
        `
      )

      // Do something
      //
    }
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export default handler
