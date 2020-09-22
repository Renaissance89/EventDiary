const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

router.get('/profile', (request, response) => {
  const statement = `select * from user where role = "admin" `
  db.query(statement, (error, admins) => {
    if (error) {
      response.send({status: 'error', error: error})
    } else {
      if (admins.length == 0) {
        response.send({status: 'error', error: 'Admin does not exist'})
      } else {
        const admin = admins[0]
        response.send(utils.createResult(error, admin))
      }
    }
  })
})
  
router.post('/signin', (request, response) => {
  const { email, password } = request.body
  
  const statement = `select * from user where email = '${email}' and password = '${password}';`
  db.query(statement, (error, admins) => {
    const result = { status: '' }
    if (admins.length == 0) {
      // user does not exist
      result['status'] = 'error'
      result['error'] = 'admin does not exist'
    } else {
      // user exists
      const admin = admins[0]
      result['status'] = 'success'
      result['data'] = {
        id: admin['id'],
        email: admin['email'],
        firstName: admin['firstName'],
        lastName: admin['lastName'],
        phone: admin['phone'],
        city: admin['city'],
        state: admin['state'],
        gender: admin['gender'],
        role: admin['role'],
      }
    }
    response.send(result)
  })
})

router.put('/', (request, response) => {
  response.send()
})

router.delete('/', (request, response) => {
  response.send()
})

module.exports = router