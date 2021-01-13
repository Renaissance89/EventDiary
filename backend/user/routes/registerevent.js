const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

//------------------------------------------------
//get
router.get('/register', (request, response) => {
  const statement = `
  select  c.registrationId, c.quantity, c.paymentAmount, e.eventName
  from register c, event e
  where c.registrationId = e.eventId and c.userId = ${request.userId}
  `
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

router.post('/registerEvent/:uId/:eId', (request, response) => {
  const {uId, eId} = request.params
  const {quantity, paymentType, paymentAmount, paymentStatus} = request.body

  const statement = `INSERT INTO register
                    (userId, eventId, quantity, paymentType, paymentAmount, paymentStatus)
                    values ('${uId}', '${eId}', '${quantity}', '${paymentType}', '${paymentAmount}',
                    '${paymentStatus}')`

  db.query(statement, (error, data) => {
    if(error) {
      response.send(utils.createResult(error,data))
    } else {
      response.send(utils.createResult(error,data))
    }
  })
})



// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

router.delete('/unRegisterEvent/:uId/:eId', (request, response) => {
  const {uId, eId} = request.params
  const statement = `DELETE FROM register WHERE userId = ${uId} and eventId = ${eId}`

  db.query(statement, (error, data) => {
    if(error) {
      response.send(utils.createResult(error,data))
    } else {
      response.send(utils.createResult(error,data))
    }
  })
})

module.exports = router