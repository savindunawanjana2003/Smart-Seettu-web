export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // this difine , this is a our costum error

    Error.captureStackTrace(this, this.constructor);
    //  this is a way  to find what ia the place,code line as awelable  error
  }
}
