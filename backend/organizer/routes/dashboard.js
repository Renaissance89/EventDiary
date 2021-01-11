const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

//show all sponser's count of organizer
router.get('/getSponserCount/:id', (request, response) => {
  const statement = `select count(sponserId) as Sponser_Count from sponser where userId = '${id}'`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

//show all active event count
router.get('/getActiveEventCount/:id', (request, response) => {
  const {id} = request.params;
  const statement = `select count(eventId) as Event_Count from event where eventOrganizerId = '${id}' 
                    and active = 1`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

//show all active/inactive (both) event count
router.get('/getAllEventCount/:id', (request, response) => {
  const {id} = request.params;
  const statement = `select count(eventId) as Event_Count from event where eventOrganizerId = '${id}'`
  db.query(statement, (error, data) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, data))
    }
  })
})

module.exports = router