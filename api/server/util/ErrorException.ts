export class ErrorException extends Error {
  statusCode: number;
  constructor(data: { message: string; statusCode: number }) {
    super(data.message);
    this.message = data.message;
    this.statusCode = data.statusCode;
  }
}

export default ErrorException;
