enum StatusCode {
  success = 200
}

class Result {
  private statusCode: number
  private code: number
  private message: string
  private data?: unknown

  constructor(statusCode: number, code: number, message: string, data?: unknown) {
    this.statusCode = statusCode
    this.code = code
    this.message = message
    this.data = data
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data
      })
    }
  }
}

export class ResponseBodyVO {
  code: number
  message: string
  data?: Record<string, unknown>
}

export class ResponseVO {
  statusCode: number
  body: string
}

export class MessageUtil {
  static success(data: unknown): ResponseVO {
    const result = new Result(StatusCode.success, 0, 'success', data)

    return result.bodyToString()
  }

  static error(code = 1000, message: string) {
    const result = new Result(StatusCode.success, code, message)

    console.log(result.bodyToString())
    return result.bodyToString()
  }
}
