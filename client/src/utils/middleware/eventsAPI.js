export const API_ROOT = 'http://localhost:3002/'

// This gets called second
function callApi(endpoint, authenticatedRequest) {

  debugger
  
  let token = localStorage.getItem('id_token') || null
  let config = {}
  
  if(authenticatedRequest) {
    if(token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    } else {
      throw new Error("No token saved!")
    }
  }

  return fetch(API_ROOT + endpoint, config)
    .then(
      response => response.json()
      .then(
        resource => ({ resource, response })
      )
    )
    .then(
      ({ resource, response }) => {
        if (!response.ok) {
          return Promise.reject(resource)
        }      
        return resource
      }
    )

}

export const CALL_EVENTS_API = Symbol('Call Events API')

// this gets called first
export default store => next => action => {
  
  const callAPI = action[CALL_EVENTS_API]
  debugger
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticatedRequest } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_EVENTS_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, authenticatedRequest).then(
    response => next(actionWith({
      response,
      authenticatedRequest,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Error!'
    }))
  )
}
