export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class NotFoundError extends HttpException {
  constructor() {
    super(404, 'List or item not found');
  }
}

export class InvalidIdsError extends HttpException {
  constructor() {
    super(400, 'Invalid IDs supplied');
  }
}
