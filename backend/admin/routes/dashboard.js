const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/getUserCount', (request, response) => {
  const statement = `select count(userId) as User_Count from user where role = "user"`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

router.get('/getOrganizerCount', (request, response) => {
  const statement = `select count(userId) as Organizer_Count from user where role = "organizer"`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

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

router.get('/getActiveEventCount', (request, response) => {
  const statement = `select count(eventId) as Event_Count from event where active = 1`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

module.exports = router