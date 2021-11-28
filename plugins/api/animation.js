import { clearObjectProperties, sendSuccessNotification } from './globalFunc'

export default (axios, store) => ({
  // Get all animations
  getAll () {
    return axios.get('/animations')
  },

  // Get one animation
  getOne (animationId) {
    return axios.get('/animations/' + animationId)
  },

  // Get animation filtered
  getFiltered (filters) {
    return axios.get('/animations', { params: filters })
  },

  // POST Request for animation
  post (animationObject, returnResponse = false) {
    const localAnimationObject = Object.assign({}, animationObject)
    if (returnResponse) {
      return axios.post('/animations', localAnimationObject)
    } else {
      return axios.post('/animations', localAnimationObject)
        .then(() => sendSuccessNotification(store, 'animation cree avec succès !'))
    }
  },

  // PUT Request for animation
  put (animationObject) {
    const localAnimationObject = Object.assign({}, animationObject)
    return axios.put('/animations/' + localAnimationObject.id,
      clearAnimationObjectProperties(localAnimationObject))
      .then(() => sendSuccessNotification(store, 'animation modifier avec succès !'))
  },

  // Delete Request for animation
  delete (animationId) {
    return axios.delete('/animations/' + animationId)
      .then(() => sendSuccessNotification(store, 'animation supprimer !'))
  }

})

// Utils function
function clearAnimationObjectProperties (object) {
  return clearObjectProperties(object, [], ['category', 'image'])
}
