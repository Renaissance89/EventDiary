const express = require('express')
const bodyParser = require('body-parser')

// routes
const routerAdmin       = require('./admin/routes/admin')
const routerUser        = require('./admin/routes/user')
const routerOrganizer   = require('./admin/routes/organizer')
const routerEvent       = require('./admin/routes/event')
const routerFeedback    = require('./admin/routes/feedback')

const app = express()

// get input from user using request.body
app.use(bodyParser.json())

// add routes to the application
app.use('/admin', routerAdmin)
app.use('/user', routerUser)
app.use('/organizer', routerOrganizer)
app.use('/event', routerEvent)
app.use('/feedback', routerFeedback)


app.listen(3000, '0.0.0.0', () => {
  console.log('server started on port 3000')
})