const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../../db')
const utils = require('../../utils')
const config = require('../../config')

const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/profile', (request, response) => {
  const statement = `select * from user where role = "admin" `
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
  
// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

router.post('/signin', (request, response) => {
  const { email, password } = request.body
  const statement = `select id, firstName, lastName, email, role from user where email = '${email}' and password = '${password}';`
  db.query(statement, (error, admins) => {
    if(error) {
      response.send({status: 'error', error: error})
    } else {
      if (admins.length == 0) {
        // admin does not exists
        response.send({status: 'error', error: 'admin does not exist'})
      } else {
        // admin exists
        const admin = admins[0]
        const token = jwt.sign({id: admin['id']}, config.secret)
        response.send(utils.createResult(error, {
          id: admin['id'],
          firstName: admin['firstName'],
          lastName: admin['lastName'],
          email: admin['email'],
          role: admin['role'],
          token: token
        }))
      }
    }  
  })
})

// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

// router.put('/', (request, response) => {
//   response.send()
// })

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

// router.delete('/', (request, response) => {
//   response.send()
// })

module.exports = router