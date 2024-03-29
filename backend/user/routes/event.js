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

//Show all User Only
router.get('/all', (request, response) => {
    const statement = `select e.eventId,c.categoryId,e.eventImage,e.eventName,e.eventDescription,
    e.eventLocation,e.eventDate,e.eventTime,e.eventDuration,
    e.eventFee,e.active,e.eventCategoryId,c.categoryName as categoryName from event e 
    inner join category c on e.eventCategoryId = c.categoryId where active = 1`

    db.query(statement, (error, data) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
        // empty products collection
        const events = []

        // iterate over the collection and modify the structure
        for (let index = 0; index < data.length; index++) {
          const tmpEvent = data[index];
          const product = {
            eventId: tmpEvent['eventId'],
            eventName: tmpEvent['eventName'],
            eventDescription: tmpEvent['eventDescription'],
            eventFee: tmpEvent['eventFee'],
            eventDate: tmpEvent['eventDate'],
            eventTime: tmpEvent['eventTime'],
            eventDuration: tmpEvent['eventDuration'],
            active: tmpEvent['active'],
            categoryName: tmpEvent['categoryName'],

            category: {
              categoryId: tmpEvent['categoryId'],
              categoryName: tmpEvent['categoryName']
            },
            eventImage: tmpEvent['eventImage']
          }
          events.push(product)
        }
        response.send(utils.createResult(error, events))
      }
    })
  })

  module.exports = router
