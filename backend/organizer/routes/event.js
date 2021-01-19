const express = require('express')
const db = require('../../db')
const utils = require('../../utils')
const fs = require('fs')

// multer: used for uploading document
const multer = require('multer')
const upload = multer({ dest: 'images/' })

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/image/:filename', (request, response) => {
  const {filename} = request.params
  const file = fs.readFileSync(__dirname + '/../../images/' + filename)
  response.send(file)
})

router.get('/getAllEvent/:id', (request, response) => {
  const { id } = request.params

  const statement = `select eventName, eventDescription, eventVenue, eventLocation, eventDate, 
            eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId, eventSponserId 
            from event where eventOrganizerId = '${request.userId}'` 

  db.query(statement, (error, event) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, event))
    }
  })
})

router.get('/getMySponsers/:eventOrganizerId', (request, response) => {
  const { eventOrganizerId } = request.params
  const statement = `SELECT * FROM sponser WHERE userId = '${eventOrganizerId}'`

  db.query(statement, (error, event) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, event))
    }
  })
})

router.get('/all', (request, response) => {
  const statement = `select eventId,eventImage,eventName,eventDescription,eventLocation,eventDate,
      eventTime,eventDuration,eventFee,active from event where eventOrganizerId = ${request.userId} `
  db.query(statement, (error, users) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, users))
    }
  })
})

// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

router.post('/upload-image/:eventId', upload.single('eventImage'), (request, response) => {
  const {eventId} = request.params
  const fileName = request.file.filename
  const statement = `update event set eventImage = '${fileName}' where eventId = ${eventId}`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })

})

// router.post('/addEvent/:eventOrganizerId', (request, response) => {
//   const { eventOrganizerId } = request.params
//   const { eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, 
//           eventCategoryId, eventSponserId, eventFee, eventImage, firstName, lastName, email, 
//           phone, gender } = request.body

//   const statement = `CALL sp_add_event('${eventName}','${eventDescription}','${eventVenue}','${eventLocation}', 
// 				  '${eventDate}', '${eventTime}', '${eventDuration}', '${eventCategoryId}', 
// 				  '${eventOrganizerId}', '${eventSponserId}', '${eventFee}', '${eventImage}', 
// 				  '${firstName}','${lastName}', '${email}', '${phone}', '${gender}')`

//  db.query(statement, (error, event) => {
//     if (error) {
//       response.send({status: 'error', error: error})
//     } else {
//       response.send(utils.createResult(error, event))
//     }
//   })
// })

router.post('/addSponser/:eventOrganizerId', (request, response) => {
  const { eventOrganizerId } = request.params
  const { firstName, lastName, email, phone, gender } = request.body

  const statement = `INSERT INTO sponser (userId, firstName, lastName, email, phone, gender) values 
				  '${eventOrganizerId}', '${firstName}','${lastName}', '${email}', '${phone}', '${gender}')`

  db.query(statement, (error, event) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, event))
    }
  })
})

router.post('/addEvent', (request, response) => {
  const { eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, 
          eventCategoryId, eventFee, eventImage } = request.body

  const statement = `INSERT INTO event(eventName, eventDescription, eventVenue, eventLocation, eventDate,
    eventTime, eventDuration, eventCategoryId, eventOrganizerId, eventFee, eventImage) 
    values ('${eventName}','${eventDescription}','${eventVenue}','${eventLocation}', '${eventDate}', 
    '${eventTime}', '${eventDuration}', '${eventCategoryId}', '${request.userId}', '${eventFee}',
    '${eventImage}')`
  
  db.query(statement, (error, event) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, event))
    }
  })
})

// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

router.put('/updateEvent/:id', (request, response) => {
  const { id } = request.params
  const { eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration,
          eventCategoryId, eventFee, eventOrganizerId, eventSponserId } = request.body

  const statement = `update event set eventName = '${eventName}', eventDescription = '${eventDescription}', 
    eventVenue = '${eventVenue}', eventLocation = '${eventLocation}', eventDate = '${eventDate}', 
    eventTime = '${eventTime}', eventDuration = '${eventDuration}', eventCategoryId = '${eventCategoryId}', 
    eventFee = '${eventFee}', eventSponserId = '${eventSponserId}' 
    where eventId = '${id}' and eventOrganizerId = '${eventOrganizerId}'`

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
  const { eventOrganizerId } = request.body
  const active = 1

  if(active == 1) {
    response.send('You cannot delete this event because it is already active. Please contact administrator!!!')
  } else {
    const statement = `delete from event where eventId = '${id}' and active = 0 
                      and eventOrganizerId = '${eventOrganizerId}'`

    db.query(statement, (error, event) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
        response.send(utils.createResult(error, event))
      }
    })
  }
})

module.exports = router