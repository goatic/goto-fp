const { createServer } = require('http')

const serveApi = require('./api')
const serveClient = require('./html')
const { serveFileBinary } = require('./file')

const PORT = 3000

const respond = responder =>
  response =>
    responder(response)

const createRouter = routeMap =>
  request =>
    Object
      .keys(routeMap)
      .includes(request.url)
        ? routeMap[request.url](request)
        : request.url.startsWith('/public')
            ? routeMap['public'](request)
            : routeMap['default'](request)

const route = createRouter({
  default: serveClient,
  public: serveFileBinary,
  '/api': serveApi
})

const resolveRequest = (request, response) =>
  Promise
    .resolve(request)
    .then(route)
    .catch(JSON.stringify.bind(JSON))
    .then(response.end.bind(response))

createServer()
  .on('request', resolveRequest)
  .on('error', console.error.bind(console))
  .listen(PORT, () =>
    console.log(`
      listening at http://localhost:${PORT}`))
