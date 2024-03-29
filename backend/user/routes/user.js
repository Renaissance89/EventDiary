const express = require('express')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const db = require('../../db')
const config = require('../../config')
const utils = require('../../utils')
const mailer = require('../../mailer')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/activate/:token', (request, response) => {
  const {token} = request.params

  // activate the user
  // reset the activation token
  const statement = `update user set active = 1, activationToken = '' where activationToken = '${token}'`
  db.query(statement, (error, data) => {

    const htmlPath = path.join(__dirname, '/../templates/activation_result.html')
    const body = '' + fs.readFileSync(htmlPath)
    response.header('Content-Type', 'text/html')
    response.send(body)
  })
})

// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

router.post('/signup', (request, response) => {
  const {firstName, lastName, email, password, phone, city, state, role, gender} = request.body
  
  const activationToken = uuid.v4()
  const activationLink = `http://localhost:4000/user/activate/${activationToken}`

  const htmlPath = path.join(__dirname, '/../templates/send_activation_link.html')
  let body = '' + fs.readFileSync(htmlPath)
  body = body.replace('firstName', firstName)
  body = body.replace('activationLink', activationLink)

  const statement = `insert into user (firstName, lastName, email, password, phone, city, state, role, gender, activationToken)
    values ('${firstName}', '${lastName}', '${email}', '${crypto.SHA256(password)}', '${phone}', '${city}', '${state}', 
    '${role}', '${gender}', '${activationToken}')`
    
  db.query(statement, (error, data) => {
    mailer.sendEmail(email, 'Welcome to Eventdiary', body, (error, info) => {
      response.send(utils.createResult(error, data))
    })
  })
})

router.post('/signin', (request, response) => {
  const {email, password} = request.body
  const statement = `select userId, firstName, lastName, role, active from user where email = '${email}' 
                    and password = '${crypto.SHA256(password)}' and active = 1`

  db.query(statement, (error, users) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else if (users.length == 0) {
      response.send({status: 'error', error: 'User does not exist'})
    } else {
      const user = users[0]
      if (user['active'] == 1) {
        // user is an active user
        const token = jwt.sign({id: user['userId']}, config.secret)
        response.send(utils.createResult(error, {
          firstName: user['firstName'],
          lastName: user['lastName'],
          token: token,
          role: user['role']
        }))
      } else {
        // user is a suspended user
        response.send({status: 'error', error: 'Your account is not active. Please contact administrator'})
      }
    }
  })
})

router.post('/forgot-password', (request, response) => {
  const {email} = request.body
  const statement = `select userId, firstName, lastName from user where email = '${email}' and role = 'user'`
  db.query(statement, (error, users) => {
    if (error) {
      response.send(utils.createError(error))
    } else if (users.length == 0) {
      response.send(utils.createError('User does not exist'))
    } else {
      const user = users[0]
      const otp = utils.generateOTP()
      const body = `Your OTP = ${otp}` 

      const otpStatement = `update user set activationToken = '${otp}' where email = '${email}' and role = 'user'`

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

router.put('/update-profile/:id', (request, response) => {
  const { id } = request.params
  const {firstName, lastName, email, password, phone, city, state, gender } = request.body
  const statement = `update user set firstName = '${firstName}', lastName = '${lastName}', 
          email = '${email}', password = '${password}', phone = '${phone}', city = '${city}', 
          state = '${state}', gender = '${gender}' where userId = ${id} and role = 'user'`
  db.query(statement, (error, data) => {
    if(error) {
      response.send(utils.createResult(error,data))
    } else {
      response.send(utils.createResult(error,data))
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

router.delete('/delete-account/:id', (request, response) => {
  const { id } = request.params
  const statement = `update user set active = 0 where userId = ${id} and role = 'user'`
  db.query(statement, (error, data) => {
    if(error) {
      response.send(utils.createResult(error,data))
    } else {
      response.send(utils.createResult(error,data))
    }
  })
})

module.exports = router