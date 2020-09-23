const { request, response } = require('express')
const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()
// getOrganiserbyid
router.get('/getOrganizerbyId/:organizerId', (request, response) => {
const {organizerId}=request.params
    const statement = `select firstName,lastName,role from user where id=${organizerId}`
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
  //organiser login
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

//organiser signup
router.post('/signup', (request, response) => {
  const {firstName,lastName,email,password,phone,city,state,gender,role}=request.body
  const statement = `insert into user (firstName, lastName, email, password, phone,city,state,gender,role) values(
    '${firstName}', '${lastName}', '${email}', '${password}', '${phone}','${city}','${state}','${gender}','${role}')`
  
  db.query(statement, (error, dbResult) => {
    response.send(utils.createResult(error, dbResult))
  })
  
})

// update organiserdetails
router.put('/editOrganizer/:organizerId', (request, response) => {
  const { firstName,lastName, email,password,phone,city, state,gender,active,role } = request.body
  const { organizerId } = request.params
  const statement = `update user set firstName = '${firstName}',lastName = '${lastName}',email = '${email}', password = '${password}',phone = '${phone}',city = '${city}',state = '${state}', gender = '${gender}',active='${active}',role='${role}' where id = ${organizerId}`
 
 db.query(statement, (error, data) => {
  response.send(utils.createResult(error, data))
})
})

//==========================================EVENT operations By organizer=====================================
///Add event by organiser
router.post('/addEvent', (request, response) => 
{
  const { eventName, eventDescription, eventVenue, eventLocation,eventDate, eventTime,eventDuration,eventCategoryId,eventFee,eventOrganizerId} = request.body

  const statement = `insert into event (eventName, eventDescription, eventVenue, eventLocation, eventDate, eventTime, eventDuration, eventCategoryId, eventFee, eventOrganizerId) values  (
    '${eventName}', '${eventDescription}', '${eventVenue}', '${eventLocation}','${eventDate}', '${eventTime}','${eventDuration}','${eventCategoryId}','${eventFee}','${eventOrganizerId}'
 )`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//update event by organizer
router.put('/editevent/:eventId',(request,response)=>
{
  const { eventId } = request.params

  const { eventName, eventDescription, eventVenue,
     eventLocation,eventDate, eventTime,
     eventDuration,eventCategoryId,eventFee,
     eventOrganizerId} = request.body

  const statement = `update event set eventName = '${eventName}',
  eventDescription = '${eventDescription}',
  eventVenue = '${eventVenue}', 
  eventLocation = '${eventLocation}',
  eventDate = '${eventDate}',
  eventTime = '${eventTime}',
  eventDuration= '${eventDuration}', 
  eventCategoryId = '${eventCategoryId}',
  eventFee='${eventFee}',
  eventOrganizerId='${eventOrganizerId}'
   where eventId = '${eventId}'
`
db.query(statement, (error, data) => {
  response.send(utils.createResult(error, data))
})
})

//showAllevent
router.get('/showAllevent', (request, response) => 
{   const statement = `select * from event `
  db.query(statement, (error, admins) => {
  if (error) {       response.send({status: 'error', error: error})
     } else {
         response.send(utils.createResult(error, admins))
      }
   })
 },



// delete event by organiser

router.delete('/deleteEvent/:eventId', (request, response) => {
  const {eventId} = request.params
  const statement = `delete from event where eventId = ${eventId}`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
}),
)

// delete organizer Account


// router.delete('/deleteOrganizer/:id', (request, response) => {
//   const {id} = request.params
//   const statement = `update user set active =0 where id =${id}`
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data))
//   })
// })

router.delete('/deleteOrganizer/:id',(request,response)=>
{
  const {id}=request.params
  const statement =`delete from user where id=${id}`
  db.query(statement,(error,data)=>
  {
    response.send(utils.createResult(error,data))
  })
})//------FK issue



module.exports = router