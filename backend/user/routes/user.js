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

router.get('/forgot-password/:email', (request, response) => {
  const {email} = request.params
  const statement = `select id, firstName, lastName from user where email = '${email}' and role = 'user'`
  db.query(statement, (error, users) => {
    if (error) {
      response.send(utils.createError(error))
    } else if (users.length == 0) {
      response.send(utils.createError('user does not exist'))
    } else {
      const user = users[0]
      const otp = utils.generateOTP()
      const body = `Your otp = ${otp}` 

      mailer.sendEmail(email, 'Reset your password', body,  (error, info) => {
        response.send(
          utils.createResult(error, {
            otp: otp,
            email: email
          })
        )
      })
    }
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

  const statement = `insert into user (firstName, lastName, email, password, phone, city, state, role, gender) values 
  ('${firstName}', '${lastName}', '${email}', '${crypto.SHA256(password)}', '${phone}', '${city}', '${state}', '${role}', 
  '${gender}', '${activationToken}')`
  db.query(statement, (error, data) => {
    mailer.sendEmail(email, 'Welcome to Eventdiary', body,  (error, info) => {
      console.log(error)
      console.log(info)
      response.send(utils.createResult(error, data))
    })
  })
})

router.post('/signin', (request, response) => {
  const {email, password} = request.body
  const statement = `select id, firstName, lastName, active from user where email = '${email}' and password = '${crypto.SHA256(password)}'`
  db.query(statement, (error, users) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else if (users.length == 0) {
      response.send({status: 'error', error: 'User does not exist'})
    } else {
      const user = users[0]
      if (user['active'] == 1) {
        // user is an active user
        const token = jwt.sign({id: user['id']}, config.secret)
        response.send(utils.createResult(error, {
          firstName: user['firstName'],
          lastName: user['lastName'],
          token: token
        }))
      } else {
        // user is a suspended user
        response.send({status: 'error', error: 'Your account is not active. Please contact administrator'})
      }
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
          state = '${state}', gender = '${gender}' where id = ${id} and role = 'user'`
  db.query(statement, (error, data) => {
    if(error) {
      response.send(utils.createResult(error,data))
    } else {
      response.send(utils.createResult(error,data))
    }
  })
})


// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

router.delete('/delete-account/:id', (request, response) => {
  const { id } = request.params
  const statement = `update user set active = 0 where id = ${id} and role = 'user'`
  db.query(statement, (error, data) => {
    if(error) {
      response.send(utils.createResult(error,data))
    } else {
      response.send(utils.createResult(error,data))
    }
  })
})

module.exports = router