export enum Method {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export enum Requests {
  users = '/api/users',
}

export enum ContentType {
  text = 'text/plain',
  json = 'application/json',
}

export enum Code {
  success = 200,
  successCreate = 201,
  successDelete = 204,
  invalidData = 400,
  userError = 404,
  serverError = 500,
}

export enum Message {
  userNotExist = 'User does not exist',
  invalidId = 'User ID is unvalid',
  invalidBody = 'Body does not have required fields',
  incorrectJSONFormat = 'Body has incorrect JSON format',
  deleteUser = 'User was deleted',
  invalidEndpoint = 'Endpoint does not exist'
}
