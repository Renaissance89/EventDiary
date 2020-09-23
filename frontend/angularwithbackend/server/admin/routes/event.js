const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

router.get('/getAllevent', (request, response) => {
    const statement = `select * from event `
    db.query(statement, (error, admins) => {
      if (error) {
        response.send({status: 'error', error: error})
      } else {
     
           response.send(utils.createResult(error, admins))
        }

    })
  })

  //active event

  module.exports = router
