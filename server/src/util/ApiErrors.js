class ApiError extends Error {
  constructor(statusCode = 500, message = 'An error occurred') {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}
export { ApiError };
