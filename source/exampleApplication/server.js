const { createServer } = require('http')
const { readFile } = require('fs')

const PORT = 3000
const FILE_ENCODING = 'binary'

const onRequest = (request, response) =>
  readFile(request.url.slice(1), FILE_ENCODING, (error, content) =>
    response.end(content || JSON.stringify(error)))

const onListen = () =>
  console.log(`
    listening at http://localhost:${PORT}
  `)

createServer()
  .on('request', onRequest)
  .on('error', console.error.bind(console))
  .listen(PORT, onListen)