const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

//------------------------------------------------
//get
router.get('/user', (request, response) => {
  const statement = `
  select  c.registrationId, e.eventName, c.quantity, c.paymentAmount
  from register c, event e
  where c.eventId = e.eventId and c.userId = ${request.userId}
  `
 // console.log(statement)
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

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
 
router.post('/user', (request, response) => {
  //const {uId} = request.params
  const {eventId,quantity, paymentAmount} = request.body

  const statement = `INSERT INTO register
                    (userId, eventId, quantity, paymentAmount)
                     values ( ${request.userId}, ${eventId}, ${quantity}, ${paymentAmount}
                   )`
                   console.log(statement)
//${request.userId}
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