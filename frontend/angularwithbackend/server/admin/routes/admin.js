const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

router.get('/profile', (request, response) => {
    const statement = `select * from user where role ="admin" `
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
  
router.post('/signin', (request, response) => {
  const email = request.body.email
  const password = request.body.password
  
  const statement = `select * from user where email = '${email}' and password = '${password}';`
  db.query(statement, (error, users) => {
    const result = { status: '' }
    if (users.length == 0) {
      // user does not exist
      result['status'] = 'error'
      result['error'] = 'user does not exist'
    } else {
      // user exists
      const user = users[0]
      result['status'] = 'success'
      result['data'] = {
        id: user['id'],
        email: user['email'],
        firstName: user['firstName'],
        lastName: user['lastName'],
        phone: user['phone'],
        city: user['city'],
        state: user['state'],
        gender: user['gender'],
        role: user['role'],
      }
    }

    response.send(result)
  })
})




module.exports = router