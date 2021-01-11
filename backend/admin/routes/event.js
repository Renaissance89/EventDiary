const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

// Show All Events
router.get('/getAllEvent', (request, response) => {
  const statement = `SELECT e.eventId as Event_Id, e.eventName as Event_Name, e.eventDescription as Description, 
      e.eventVenue as Venue, e.eventLocation as Location, e.eventDate as Date, e.eventTime as Time, 
      e.eventDuration as Duration, c.categoryName as Category,
      u.firstName as Organizer_FirstName, u.lastName as Organizer_LastName, u.phone as OrganizerPhone, 
      s.firstName as Event_Sponser_FirstName, s.lastName as Event_Sponser_LastName, s.phone as SponserPhone, 
      e.eventFee as Registration_Fee, e.active as Active FROM event e
      INNER JOIN user u ON e.eventOrganizerId = u.id
      INNER JOIN sponser s ON e.eventSponserId = s.sponserId
      INNER JOIN category c ON e.eventCategoryId = c.categoryId`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------



// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

// Update active status i.e Set completed to 0
router.put('/toggle-active/:id', (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const statement = `update event set Active = '${status}' where eventId = ${id}`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------
module.exports = router