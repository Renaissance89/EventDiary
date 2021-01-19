const express = require('express')
const db = require('../../db')
const utils = require('../../utils')
const fs = require('fs')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/image/:filename', (request, response) => {
  const {filename} = request.params
  const file = fs.readFileSync(__dirname + '/../../images/' + filename)
  response.send(file)
})

// // Show All Events
// router.get('/getAllEvent', (request, response) => {
//   const statement = `SELECT e.eventId , e.eventName as Event_Name,e.eventImage ,e.eventDescription as Description, 
//       e.eventVenue as Venue, e.eventLocation as Location, e.eventDate as Date, e.eventTime as Time, 
//       e.eventDuration as Duration, c.categoryName as Category,
//       u.firstName as Organizer_FirstName, u.lastName as Organizer_LastName, u.phone as OrganizerPhone, 
//       s.firstName as Event_Sponser_FirstName, s.lastName as Event_Sponser_LastName, s.phone as SponserPhone, 
//       e.eventFee as Registration_Fee, e.active FROM event e
//       INNER JOIN user u ON e.eventOrganizerId = u.UserId
//       INNER JOIN sponser s ON e.eventSponserId = s.sponserId
//       INNER JOIN category c ON e.eventCategoryId = c.categoryId`
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data))
//   })
// })

// Show All Events Without Sponser
router.get('/getAllEvent', (request, response) => {
  const statement = `SELECT e.eventId , e.eventName as Event_Name, e.eventImage ,e.eventDescription as Description, 
      e.eventVenue as Venue, e.eventLocation as Location, e.eventDate as Date, e.eventTime as Time, 
      e.eventDuration as Duration, c.categoryName as Category,
      u.firstName as Organizer_FirstName, u.lastName as Organizer_LastName, u.phone as OrganizerPhone, 
      e.eventFee as Registration_Fee, e.active FROM event e
      INNER JOIN user u ON e.eventOrganizerId = u.UserId
      INNER JOIN category c ON e.eventCategoryId = c.categoryId`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// Show Event By Id
router.get('/getEventById/:id', (request, response) => {
  const { id } = request.params
  const statement = `SELECT e.eventId , e.eventName as Event_Name, e.eventImage , e.eventDescription as Description, 
      e.eventVenue as Venue, e.eventLocation as Location, e.eventDate as Date, e.eventTime as Time, 
      e.eventDuration as Duration, c.categoryName as Category,
      u.firstName as Organizer_FirstName, u.lastName as Organizer_LastName, u.phone as OrganizerPhone, 
      e.eventFee as Registration_Fee, e.active FROM event e
      INNER JOIN user u ON e.eventOrganizerId = u.UserId
      INNER JOIN category c ON e.eventCategoryId = c.categoryId 
      WHERE eventId = '${id}'`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

// Update active status i.e Set completed to 0
router.put('/toggle-active/:eventId', (request, response) => {
  const { eventId } = request.params
  const { status } = request.body
  const statement = `update event set active = '${status}' where eventId = ${eventId}`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


module.exports = router
