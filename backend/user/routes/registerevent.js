const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/user', (request, response) => {
  const statement = `select  c.registrationId, e.eventName, c.quantity, c.paymentAmount, c.totalAmount
                  from register c, event e where c.eventId = e.eventId and c.userId = ${request.userId}`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.get('/', (request, response) => {
  const statement = `
  select sum(totalAmount) from register where userId =12;
  where userId = ${request.userId}`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

router.post('/user', (request, response) => {
  const {eventId,quantity, paymentAmount} = request.body
  const totalAmount = paymentAmount * quantity

  const statement = `INSERT INTO register (userId, eventId, quantity, paymentAmount,totalAmount)
                     values ( ${request.userId}, ${eventId}, ${quantity}, ${paymentAmount}, ${totalAmount})`

  db.query(statement, (error, data) => {
    if(error) {
      response.send(utils.createResult(error,data))
    } else {
      response.send(utils.createResult(error,data))
    }
  })
})

// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

router.put('/:registrationId', (request, response) => {
  const {registrationId} = request.params
  const {quantity, paymentAmount} = request.body
  const totalAmount = paymentAmount * quantity
  const statement = `update register set quantity = ${quantity}, totalAmount = ${totalAmount}
      where registrationId = ${registrationId}`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

router.delete('/:id', (request, response) => {
  const { id} = request.params
  const statement = `DELETE FROM register WHERE  registrationId = ${id}`

  db.query(statement, (error, data) => {
    if(error) {
      response.send(utils.createResult(error,data))
    } else {
      response.send(utils.createResult(error,data))
    }
  })
})

module.exports = router
