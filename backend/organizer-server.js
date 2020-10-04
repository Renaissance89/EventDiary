const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config')

// routers
const organizerRouter = require('./organizer/routes/organizer')
// const eventRouter = require('./organizer/routes/event')

const app = express()
app.use(cors('*'))
app.use(bodyParser.json())
app.use(morgan('tiny'))

// add a middleware for getting the id from token
function getUserId(request, response, next) {

  if (request.url == '/organizer/signin' 
      || request.url == '/organizer/signup'
      || request.url.startsWith('/organizer/activate')
      || request.url.startsWith('/organizer/forgot-password')) {
    // do not check for token 
    next()
  } else {

    try {
      const token = request.headers['token']
      const data = jwt.verify(token, config.secret)

      // add a new key named userId with logged in user's id
      request.userId = data['id']

      // go to the actual route
      next()
      
    } catch (ex) {
      response.status(401)
      response.send({status: 'error', error: 'protected api'})
    }
  }
}

app.use(getUserId)

// required to send the static files in the directory named images
app.use(express.static('images/'))

// add the routes
app.use('/organizer', organizerRouter)
// app.use('/event', eventRouter)


// default route
app.get('/', (request, response) => {
  response.send('Welcome to EventDiary')
})

app.listen(4000, '0.0.0.0', () => {
  console.log('server started on port 4000')
})