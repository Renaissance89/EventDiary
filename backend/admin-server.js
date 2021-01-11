const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')


// routers/routes for admin
const routerAdmin = require('./admin/routes/admin')
const routerUser = require('./admin/routes/user')
const routerOrganizer = require('./admin/routes/organizer')
const routerCategory = require('./admin/routes/category')
const routerEvent = require('./admin/routes/event')
const routerFeedback= require('./admin/routes/feedback')
const routerSponser= require('./admin/routes/sponser')
const routerDashbord= require('./admin/routes/dashboard')

const app = express()
app.use(cors('*'))
app.use(bodyParser.json())
app.use(morgan('combined'))

// add the routes to the application
app.use('/admin', routerAdmin)
app.use('/user', routerUser)
app.use('/organizer', routerOrganizer)
app.use('/category', routerCategory)
app.use('/event', routerEvent)
app.use('/feedback', routerFeedback)
app.use('/sponser', routerSponser)
app.use('/dashbord',routerDashbord)

// default route
app.get('/', (request, response) => {
  response.send('Welcome To Event Diary')
})

app.listen(3000, '0.0.0.0', () => {
  console.log('server started on port 3000')
})
