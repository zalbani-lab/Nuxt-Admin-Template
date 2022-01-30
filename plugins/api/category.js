import { clearObjectProperties, sendSuccessNotification } from './globalFunc'

export default (axios, store) => ({
  // Get all categories
  getAll () {
    return axios.get('/categories')
  },

  // Get one category
  getOne (categoryId) {
    return axios.get('/categories/' + categoryId)
  },

  // Get category filtered
  getFiltered (filters) {
    return axios.get('/categories', { params: filters })
  },

  // POST Request for category
  post (categoryObject) {
    const localcategoryObject = Object.assign({}, categoryObject)
    return axios.post('/categories', localcategoryObject)
      .then(() => sendSuccessNotification(store, 'category cree avec succès !'))
  },
  // PUT Request for category
  put (categoryObject) {
    const localcategoryObject = Object.assign({}, categoryObject)
    return axios.put('/categories/' + localcategoryObject.id,
      clearCategoryObjectProperties(localcategoryObject))
      .then(() => sendSuccessNotification(store, 'category modifier avec succès !'))
  },
  // Delete Request for category
  delete (categoryId) {
    return axios.delete('/categories/' + categoryId)
      .then(() => sendSuccessNotification(store, 'category supprimer !'))
  }
})

// Utils function
function clearCategoryObjectProperties (object) {
  return clearObjectProperties(object, ['animations'])
}
