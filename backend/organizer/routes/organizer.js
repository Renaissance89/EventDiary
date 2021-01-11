const express = require('express')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const db = require('../../db')
const utils = require('../../utils')
const config = require('../../config')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/profile/:id', (request, response) => {
  const { id } = request.params
  const statement = `select firstName, lastName, email, phone, city, state, gender from user 
                    where userId = '${id}' and role = "organizer" `
  db.query(statement, (error, organizer) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, organizer))
    }
  })
})
  
// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

router.post('/signup', (request, response) => {
  const {firstName, lastName, email, password, phone, city, state, gender, role} = request.body
  
  const activationToken = uuid.v4()
  
  const statement = `insert into user (firstName, lastName, email, password, phone, city, state, 
              gender, role, activationToken) values ('${firstName}', '${lastName}', '${email}', 
              '${crypto.SHA256(password)}','${phone}', '${city}', '${state}', '${gender}', '${role}',
              '${activationToken}')`

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


router.post('/signin', (request, response) => {
  const { email, password, role } = request.body

  const statement = `select userId, firstName, lastName, email, role from user where email = '${email}' 
                  and password = '${crypto.SHA256(password)}' and role = '${role}';`

  db.query(statement, (error, organizers) => {
    if(error) {
      response.send({status: 'error', error: error})
    } else {
      if (organizers.length == 0) {
        // organizer does not exists
        response.send({status: 'error', error: 'Organizer does not exist'})
      } else {
        // organizer exists
        const organizer = organizers[0]
        const token = jwt.sign({id: organizer['id']}, config.secret)
        response.send(utils.createResult(error, {
          id: organizer['id'],
          firstName: organizer['firstName'],
          lastName: organizer['lastName'],
          email: organizer['email'],
          role: organizer['role'],
          token: token
        }))
      }
    }  
  })
})

// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

router.put('/updateProfile/:id', (request, response) => {
  const { id } = request.params
  const { firstName, lastName , email, password, phone } = request.body
  const statement = `update user set firstName = '${firstName}', lastName = '${lastName}', 
        email = '${email}', password = '${crypto.SHA256(password)}', phone = '${phone}' 
        where userId = '${id}' and role = "organizer"`

  db.query(statement, (error, organizer) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, organizer))
    }
  })
})

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

router.delete('/deleteAccount/:id', (request, response) => {
  const { id } = request.params
  const statement = `update user set active = 0 where userId = '${id}' and role = "organizer"`
  db.query(statement, (error, organizer) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, organizer))
    }
  })
})

module.exports = router