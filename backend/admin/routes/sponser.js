const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

// Show all Sponser's Only
router.get('/getAllSponser', (request, response) => {
  const statement = `select s.sponserId, s.firstName, s.lastName, s.email, s.phone, s.gender, 
            u.firstName as Organizer_FirstName, u.lastName as Organizer_LastName from sponser s
            INNER JOIN user u ON s.userId = u.userId`
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


// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------


module.exports = router