const express = require('express')
const db = require('../../db')
const utils = require('../../utils')

const router = express.Router()


// ------------------------------------------------------------
//                            GET
// ------------------------------------------------------------

// Show All Category
router.get('/getAllCategory', (request, response) => {
  const statement = `select * from category`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            POST
// ------------------------------------------------------------

// Add New Category
router.post('/addCategory', (request, response) => {
  const { categoryName } = request.body
  const statement = `insert into category (categoryName) values ('${categoryName}')`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            PUT
// ------------------------------------------------------------

// Update Category Name
router.put('/updateCategory/:id', (request, response) => {
  const { id } = request.params
  const { categoryName } = request.body
  const statement = `update category set categoryName = '${categoryName}' where categoryId = '${id}'`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// ------------------------------------------------------------
//                            DELETE
// ------------------------------------------------------------

// Delete Category
router.delete('/deleteCategory/:id', (request, response) => {
  const { id } = request.params
  const statement = `delete from category where categoryId = ${id}`
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router