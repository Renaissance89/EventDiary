const express = require('express')
const utils = require('../../utils')
const db = require('../../db')
const router = express.Router()

// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

router.get('/', (request, response) => {
  const statement = `select categoryId, categoryName, categoryDescription from category`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router
