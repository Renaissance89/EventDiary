const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

// Show all Organizer's Only
router.get('/getAllOrganizer', (request, response) => {
  const statement = `select userId, firstName,lastName, email, phone, city, state, gender, role, 
                    active from user where role = "organizer" `
  db.query(statement, (error, users) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, users))
    }
  })
})

// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

// Suspend Organizer and ReActivate Organizer
router.put('/toggle-active/:id', (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const statement = `update user set active = ${status} where userId = ${id} and role = "organizer"`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router