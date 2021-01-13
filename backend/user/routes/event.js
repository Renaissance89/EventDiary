const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

//Show my(specific to user) all events
router.get('/getEvent/:userId', (request, response) => {
  const { userId } = request.params

  const statement = `select  r.registrationId, e.eventName, e.eventLocation, r.quantity, r.paymentAmount
                    from register r INNER JOIN event e
                    ON r.eventId = e.eventId and r.userId = '${userId}'`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// Show all events User Only
router.get('/getAllEvents', (request, response) => {
  const statement = `select eventName, eventDescription, eventLocation, eventDate, eventTime,
                    eventDuration,eventFee,active from event`
  
  db.query(statement, (error, users) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, users))
    }
  })
})

module.exports = router