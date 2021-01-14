const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

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
  module.exports = router
