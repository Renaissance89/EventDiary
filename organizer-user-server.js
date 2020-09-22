const express = require('express')
const bodyParser = require('body-parser')

// routes
const routerorganizer_user = require('./organizer_user/routes/organizer')
const routerorganizer_user1 = require('./organizer_user/routes/user')


const app = express()

// get input from user using request.body
app.use(bodyParser.json())

// add routes to the application
app.use('/organizer_user/org', routerorganizer_user)
app.use('/organizer_user/user', routerorganizer_user1)


app.listen(4000, '0.0.0.0', () => {
    console.log('server started on port 4000')
  })