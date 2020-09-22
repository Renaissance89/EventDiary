function createResult(error, data) {
    const result = { status: '' }
    if (error) {
      // error while performing the statement
      result['status'] = 'error'
      result['error'] = error
    } else {
      // execution went successful
      result['status'] = 'success'
      result['data'] = data
    }
  
    return result
  }
  
  module.exports = {
    createResult: createResult
  }