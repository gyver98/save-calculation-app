// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use(function (req, res, next) {
  console.log(req.body)
  if (req.method === 'POST') {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    req.method = 'GET'
    req.query = req.body
  }
  
  next()
})

server.post('/', function (req, res, next) {
  req.method = 'GET'
  req.query = req.body
  next()
})

server.use(router)
server.listen(1337, function () {
  console.log('JSON Server is running')
})