const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

//show all user's count
router.get('/getUserCount', (request, response) => {
  const statement = `select count(role) as User_Count from user where role = "user"`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

//show all organizer's count
router.get('/getOrganizerCount', (request, response) => {
  const statement = `select count(role) as Organizer_Count from user where role = "organizer"`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

//show all sponser's count
router.get('/getSponserCount', (request, response) => {
  const statement = `select count(sponserId) as Sponser_Count from sponser`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

//show all active event count
router.get('/getActiveEventCount', (request, response) => {
  const statement = `select count(eventId) as Event_Count from event`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})


module.exports = router