import { KinesisStreamHandler, KinesisStreamRecordPayload, KinesisStreamEvent, Context } from 'aws-lambda'
import { inspect } from 'util'
import logger from './log'
import 'source-map-support/register'

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
