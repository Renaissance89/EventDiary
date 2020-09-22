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
      if (organizers.length == 0) {
        response.send({status: 'error', error: 'Organizer does not exist'})
      } else {
        const organizers = organizers[0]
        response.send(utils.createResult(error, organizer))
      }
    }
  })
})

router.delete('/deleteOrganizer/:id', (request, response) => {
  const { id } = request.params
  const statement = `delete from user where role = "organizer" and id = ${id} `
  db.query(statement, (error, organizers) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (organizers.length == 0) {
        response.send({status: 'error', error: 'Organizer does not exist'})
      } else {
        const organizer = organizers[0]
        response.send(utils.createResult(error, organizer))
      }
    }
  })
})

module.exports = router