const express = require('express')

const bodyParser = require('body-parser')

const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
  next();
});

// routes
const routerAdmin = require('./admin/routes/admin')
const routerUser = require('./admin/routes/user')
const routerOrganizer = require('./admin/routes/organizer')
const routerevent = require('./admin/routes/event')


//const app = express()

// get input from user using request.body
app.use(bodyParser.json())

// add routes to the application
app.use('/admin', routerAdmin)
app.use('/user', routerUser)
app.use('/organizer', routerOrganizer)
app.use('/event',routerevent)



app.listen(3000, '0.0.0.0', () => {
  console.log('server started on port 3000')
})
