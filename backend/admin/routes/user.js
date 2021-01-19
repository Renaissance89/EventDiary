const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

// Show all User Only
router.get('/getAllUser', (request, response) => {
  const statement = `select userId, firstName,lastName, email, phone, city, state, gender, role,
                    active from user where role = "user" `
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

// Suspend User and ReActivate User
router.put('/toggle-active/:userId', (request, response) => {
  const { userId } = request.params
  const { status } = request.body
  const statement = `update user set active = ${status} where userId = ${userId} and role = 'user'`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router