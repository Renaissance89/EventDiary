function createResult(error, dbResult) {
    const result = { status: '' }
    if (error) {
      // error while performing the statement
      result['status'] = 'error'
      result['error'] = error
    } else {
      // execution went successfull
      result['status'] = 'success'
      result['data'] = dbResult
    }
  
    return result
  }
  
  module.exports = {
    createResult: createResult
  }