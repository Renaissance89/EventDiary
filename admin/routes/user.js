const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

router.get('/getAllUser', (request, response) => {
    const statement = `select * from user where role ="user" `
    db.query(statement, (error, admins) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
        if (admins.length == 0) {
          response.send({status: 'error', error: 'admin does not exist'})
        } else {
          const admin = admins[0]
          response.send(utils.createResult(error, admin))
        }
      }
    })
  })

  module.exports = router