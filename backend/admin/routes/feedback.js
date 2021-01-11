const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

// Show All Feedbacks
router.get('/getAllFeedback', (request, response) => {
  const statement = `SELECT f.feedbackId, u.firstName as User_FirstName, u.lastName as User_LastName, 
                e.eventName as Event_name, e.eventVenue as Venue, f.subject as Subject, 
                f.message as Feedback FROM feedback f
                INNER JOIN user u ON f.userId = u.id
                INNER JOIN event e ON f.eventId = e.eventId`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})
  

module.exports = router