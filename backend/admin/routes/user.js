const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

// Show all User Only
router.get('/getAllUser', (request, response) => {
  const statement = `select id, firstName,lastName, email, phone, city, state, gender, role,
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
//                            POST
// ------------------------------------------------------------


// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

// Suspend User and ReActivate User
router.put('/toggle-active/:id', (request, response) => {
  const { id } = request.params
  const { status } = request.body
  const statement = `update user set active = ${status} where id = ${id} and role = 'user'`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------


module.exports = router