const e = require('express')
const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// --------------------------------------------------------
//                            GET
// --------------------------------------------------------

router.get('/getAllEvent', (request, response) => {
  const statement = `SELECT e.eventId as Event_Id, e.eventName as Event_Name, e.eventDescription as Description, e.eventVenue as Venue, 
          e.eventDate as Date, e.eventTime as Time, c.categoryName as Category,
          u.firstName as Event_Organizer, s.firstName as Sponser_Name FROM event e
          INNER JOIN user u ON e.eventOrganizerId = u.id
          INNER JOIN sponser s ON e.eventSponserId = s.sponserId
          INNER JOIN category c ON e.eventCategoryId = c.categoryId`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

module.exports = router

