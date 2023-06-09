class NotAuthorized extends Error {
  statusCode = 401

  constructor(message) {
    super(message)
  }
}

class NotFound extends Error {
  statusCode = 404

  constructor(message) {
    super(message)
  }
}
module.exports = { NotAuthorized, NotFound }