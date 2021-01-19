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
        const token = jwt.sign({id: organizer['userId']}, config.secret)
        response.send(utils.createResult(error, {
          id: organizer['userId'],
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

router.post('/forgot-password', (request, response) => {
  const {email} = request.body
  const statement = `select userId, firstName, lastName from user where email = '${email}' and role = 'organizer'`
  db.query(statement, (error, users) => {
    if (error) {
      response.send(utils.createError(error))
    } else if (users.length == 0) {
      response.send(utils.createError('Organizer does not exist'))
    } else {
      const user = users[0]
      const otp = utils.generateOTP()
      const body = `Your OTP = ${otp}` 

      const otpStatement = `update user set activationToken = '${otp}' where email = '${email}' and role = 'organizer'`

      db.query(otpStatement, (error, data) => {
          if (error) {
              response.send(utils.createError(error))
          } else {
            mailer.sendEmail(email, 'Reset your password', body, (error, info) => {
                console.log(error)
                console.log(info)
                response.send(utils.createResult(error, { otp: otp, email: email, data: data }))
            })
          }
      })
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

router.put('/reset-password', (request, response) => {
  const { otp, email, password } = request.body
  const checkStatement = `select userId from user where activationToken = '${otp}' and email = '${email}'`
  
  db.query(checkStatement, (error, user) => {
    if (user.length == 0) {
      // check if otp is valid or not
      response.send({ status: 'error', error: 'Invalid OTP' })
    } else if (error) {
      response.send({ status: 'error', error: error })
    } else {
      // activate the user
      // reset the activation token
      const statement = `update user set password = '${crypto.SHA256(password)}', activationToken = '' 
                        where activationToken = '${otp}' and email = '${email}'`
      
      db.query(statement, (error, data) => {
          response.send(utils.createResult(error, data))
      })
    }
  })
})

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

router.delete('/deleteAccount', (request, response) => {
  const statement = `update user set active = 0 where userId = '${request.userId}' and role = "organizer"`
  db.query(statement, (error, organizer) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      response.send(utils.createResult(error, organizer))
    }
  })
})

module.exports = router