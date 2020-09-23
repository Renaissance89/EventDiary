const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

router.get('/getAllOrganizer', (request, response) => {
    const statement = `select * from user where role ="organizer" `
    db.query(statement, (error, admins) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
     
           response.send(utils.createResult(error, admins))
        }

    })
  })



  delete organizer
  router.delete('/deleteOrganizer/:id', (request, response) => {
    const {id} = request.params
    const statement = `update user set active =0 where id =${id}`
    db.query(statement, (error, data) => {
      response.send(utils.createResult(error, data))
    })
  })

  module.exports = router