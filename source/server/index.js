const { createServer } = require('http')

const serveApi = require('./api')
const serveClient = require('./html')
const { serveFileBinary } = require('./file')

const PORT = 3000

const createRouter = routeMap =>
  request =>
    routeMap[request.url]
      ? routeMap[request.url](request)
      : request.url.startsWith('/public')
          ? routeMap['public'](request)
          : routeMap['default'](request)

const route = createRouter({
  default: serveClient,
  public: serveFileBinary,
  '/api': serveApi
})

const onRequest = (request, response) =>
  Promise
    .resolve(request)
    .then(route)
    .catch(JSON.stringify.bind(JSON))
    .then(response.end.bind(response))

const onError = console.error.bind(console)

const onListen = () =>
  console.log(`
    listening at http://localhost:${PORT}
  `)

createServer()
  .on('request', onRequest)
  .on('error', onError)
  .listen(PORT, onListen)
