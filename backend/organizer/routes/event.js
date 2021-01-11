const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/getAllEvent/:id', (request, response) => {
  const { id } = request.params

  const statement = `select eventName, eventDescription, eventVenue, eventLocation, eventDate, 
            eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId 
            from event where eventOrganizerId = '${id}'` 

  db.query(statement, (error, event) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, event))
    }
  })
})

// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

// router.post('/addEvent', (request, response) => {
//   const { eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, 
//     eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId } = request.body

//   const statement = 
// DELIMITER $$
//    CREATE PROCEDURE sp_add_event(eventName, eventDescription, eventVenue, eventLocation, eventDate,
//               eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId,
//               eventImage, firstName, lastName, email, phone, gender)

// BEGIN

//     INSERT INTO event (eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId, eventImage) values 
//     (eventName,eventDescription,eventVenue,eventLocation, eventDate, eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId, eventImage );

//     INSERT INTO sponser (firstName, lastName, email, phone, gender) values (firstName, lastName, email, phone, gender);

// END 

// DELIMITER ;

// CALL sp_add_event('${eventName}', '${eventDescription}', '${eventVenue}', '${eventLocation}', 
//                   '${eventDate}', '${eventTime}', '${eventDuration}', '${eventCategoryId}', 
//                   '${eventFee}', '${eventOrganizerId}', '${eventSponserId}','${eventImage}', 
//                   '${firstName}','${lastName}', '${email}' , '${phone}','${gender}');

//  db.query(statement, (error, event) => {
//     if (error) {
//       response.send({status: 'error', error: error})
//     } else {
//       response.send(utils.createResult(error, event))
//     }
//   })
// })

// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

router.put('/updateEvent/:id', (request, response) => {
  const { id } = request.params
  const { eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId } = request.body

  const statement = `update event set eventName = '${eventName}', eventDescription = '${eventDescription}', 
    eventVenue = '${eventVenue}', eventLocation = '${eventLocation}', eventDate = '${eventDate}', 
    eventTime = '${eventTime}', eventDuration = '${eventDuration}', eventCategoryId = '${eventCategoryId}', 
    eventFee = '${eventFee}', eventOrganizerId = '${eventOrganizerId}', eventSponserId = '${eventSponserId}' 
    where eventId = '${id}'`

  db.query(statement, (error, event) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, event))
    }
  })
})

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

router.delete('/deleteEvent/:id', (request, response) => {
  const { id } = request.params

  const statement = `delete from event where eventId = '${id}'`

  db.query(statement, (error, event) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, event))
    }
  })
})


module.exports = router