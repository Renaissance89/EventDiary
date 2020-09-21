const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()

router.get('/getuserbyId/:userId', (request, response) => {
const {userId}=request.params
    const statement = `select firstName,lastName,role from user where id=${userId}`
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

router.post('/signup', (request, response) => {
  const {firstName,lastName,email,password,phone,city,state,gender,role}=request.body
  const statement = `insert into user (firstName, lastName, email, password, phone,city,state,gender,role) values(
    '${firstName}', '${lastName}', '${email}', '${password}', '${phone}','${city}','${state}','${gender}','${role}')`
  
  db.query(statement, (error, dbResult) => {
    response.send(utils.createResult(error, dbResult))
  })
  
})

router.put('/edituser/:userId', (request, response) => {
  const { firstName,lastName, email,password,phone,city, state,gender,role } = request.body
  const { userId } = request.params
  const statement = `update user set firstName = '${firstName}',lastName = '${lastName}',email = '${email}', password = '${password}',phone = '${phone}',city = '${city}',state = '${state}', gender = '${gender}' where id = ${userId}`
 
 db.query(statement, (error, data) => {
  response.send(utils.createResult(error, data))
})
})


router.delete('/', (request, response) => {
  response.send()
})

module.exports = router