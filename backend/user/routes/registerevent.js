const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

router.post('/register-event/:userId', (request, response) => {
  const { userId } = request.params
  const { eventId, quantity, paymentType, amount } = request.body
  // here eventFee = amount
  const paymentStatus = 1
  const paymentAmount = quantity * amount;

  if(quantity > 0 && paymentAmount > 0) {
    const statement = `INSERT INTO register (userId, eventId, quantity, amount, paymentType, 
          paymentStatus, paymentAmount) values ('${userId}', '${eventId}', '${quantity}', '${amount}', 
          '${paymentType}', '${paymentStatus}', '${paymentAmount}')`
    
    db.query(statement, (error, data) => {
      if(error) {
        response.send(utils.createResult(error,data))
      } else {
        response.send(utils.createResult(error,data))
      }
    })
  }
  else {
    const statement = `INSERT INTO register (userId, eventId, quantity, amount, paymentType, paymentAmount)
      values ('${userId}', '${eventId}', '${quantity}', '${amount}', '${paymentType}', '${paymentAmount}')`

    db.query(statement, (error, data) => {
      if(error) {
        response.send(utils.createResult(error,data))
      } else {
        response.send(utils.createResult(error,data))
      }
    })
  }
})

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

router.delete('/unregister-event/:uId/:eId', (request, response) => {
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