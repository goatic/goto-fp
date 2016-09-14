const { readFile } = require('fs')

const promiseFile = encoding =>
  path =>
    new Promise((resolve, reject) =>
      readFile(path, encoding, (error, result) =>
        error
          ? reject(error)
          : resolve(result)))

const promiseFileBinary = promiseFile()

const serveFileBinary = request =>
  promiseFileBinary(request.url.slice(1))

module.exports = { serveFileBinary }
