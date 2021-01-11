const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

//show all users count
router.get('/ucount', (request, response) => {
    const statement = `select count(role) from user where role="user"`
    db.query(statement, (error, users) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
        response.send(utils.createResult(error, users))
      }
    })
  })
  module.exports = router


  //show all organizers  count
router.get('/ocount', (request, response) => {
    const statement = `select count(role) from user where role="organizer"`
    db.query(statement, (error, users) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
        response.send(utils.createResult(error, users))
      }
    })
  })
  module.exports = router