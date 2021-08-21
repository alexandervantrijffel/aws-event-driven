import { v4 as uuidv4 } from 'uuid'
import { MessageUtil } from './message'
import { Kinesis } from 'aws-sdk'
import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

// todo only do this in local dev
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
import * as https from 'https'

const kinesis = new Kinesis({
  apiVersion: '2013-12-02',
  endpoint: 'https://localhost:4566'
})

kinesis.config.update({
  httpOptions: { agent: new https.Agent({ rejectUnauthorized: false }) }
})

// todo check if the stream already exists
// kinesis.createStream(
//   {
//     StreamName: streamName,
//     ShardCount: 1,
//   },
//   (err, data) => console.log("callback", { err, data })
// );

export const handler = async (_event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const stream = process.env.TARGET_STREAM as string
    await kinesis
      .putRecord({
        StreamName: stream,
        PartitionKey: uuidv4(),
        Data: JSON.stringify({ happyhapp: true })
      })
      .promise()

    return MessageUtil.success({
      happy: true,
      message: `Message placed in stream ${stream}`,
      testenv: process.env.TESTENV
    })
  } catch (error) {
    console.log(error)
    return MessageUtil.error(500, error.message)
  }
}

export default handler
// import { APIGatewayProxyHandler } from "aws-lambda";
// const producer: APIGatewayProxyHandler = async (event) => {
//   let statusCode = 200;
//   let message: string;

//   if (!event.body) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({
//         message: "No body was found",
//       }),
//     };
//   }

//   const streamName = "eventStream";

//   try {
//     await kinesis
//       .putRecord({
//         StreamName: streamName,
//         PartitionKey: uuidv4(),
//         Data: event.body,
//       })
//       .promise();

//     message = "Message placed in the Event Stream!";
//   } catch (error) {
//     console.log(error);
//     message = error;
//     statusCode = 500;
//   }

//   return {
//     statusCode,
//     body: JSON.stringify({
//       message,
//     }),
//   };
// };

// export default producer;
