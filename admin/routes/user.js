const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

router.get('/getAllUser', (request, response) => {
  const statement = `select * from user where role ="user" `
  db.query(statement, (error, users) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (users.length == 0) {
        response.send({status: 'error', error: 'User does not exist'})
      } else {
        const user = users[0]
        response.send(utils.createResult(error, user))
      }
    }
  })
})

router.delete('/deleteUser/:id', (request, response) => {
  const { id } = request.params
  const statement = `delete from user where role = "user" and id = ${id} `
  db.query(statement, (error, users) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (users.length == 0) {
        response.send({status: 'error', error: 'User does not exist'})
      } else {
        const user = users[0]
        response.send(utils.createResult(error, user))
      }
    }
  })
})

module.exports = router