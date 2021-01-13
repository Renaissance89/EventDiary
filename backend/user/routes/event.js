const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

// Show all User Only
router.get('/all', (request, response) => {
    const statement = `select eventId,eventName,eventDescription,eventLocation,eventDate,eventTime,eventDuration,eventFee,active from event `
    db.query(statement, (error, users) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
        response.send(utils.createResult(error, users))
      }
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