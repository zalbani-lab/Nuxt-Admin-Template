import { clearObjectProperties, sendSuccessNotification } from './globalFunc'

export default (axios, store) => ({
  // Get all users
  getAll () {
    return axios.get('/users')
  },

  // Get one user
  getOne (userId) {
    return axios.get('/users/' + userId)
  },

  getFiltered (filters) {
    return axios.get('/users', { params: filters })
  },

  // POST Request for user
  post (userObject) {
    const localUserObject = Object.assign({}, userObject)
    return axios.post('/users', localUserObject)
      .then(() => sendSuccessNotification(store, 'User cree avec succès !'))
  },
  // PUT Request for user
  put (userObject) {
    const localUserObject = Object.assign({}, userObject)
    return axios.put('/users/' + localUserObject.id,
      clearUserObjectProperties(localUserObject))
      .then(() => sendSuccessNotification(store, 'User modifier avec succès !'))
  },
  // Delete Request for user
  delete (userId) {
    return axios.delete('/users/' + userId)
      .then(() => sendSuccessNotification(store, 'User supprimer !'))
  },
  updateRole (userObject) {
    const localUserObject = Object.assign({}, userObject)
    return axios.patch('/users/' + localUserObject.id + '/updateRole', { roles: localUserObject.roles })
      .then(() => {
        const message = 'l\'utilisateur ' + localUserObject.email + ' est maintenant ' + localUserObject.roles[0].toString().split('_').pop().toLowerCase() + ' !'
        sendSuccessNotification(store, message)
      })
  }
})

// Utils function
function clearUserObjectProperties (object) {
  return clearObjectProperties(object, ['animations'])
}
