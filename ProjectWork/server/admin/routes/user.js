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
    
          response.send(utils.createResult(error, admins))
        }

  })
  })


  delete user
  router.delete('/deleteuser/:id', (request, response) => {
    const {id} = request.params
    const statement = `update user set active =1 where id =${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })


  module.exports = router