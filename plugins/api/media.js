import { sendSuccessNotification, clearObjectProperties } from './globalFunc'

export default (axios, store) => ({
  // Get all medias
  getAll () {
    return axios.get('/media')
  },

  // Get medias filtered
  getFiltered (filters) {
    return axios.get('/media', { params: filters })
  },

  // POST Request for media
  post (mediaObject) {
    const localMediaObject = Object.assign({}, mediaObject)
    return axios.post(
      '/media',
      formatObjectIntoFormData(localMediaObject),
      { 'Content-Type': 'multipart/form-data' }
    )
      .then(() => sendSuccessNotification(store, 'Media cree avec succès !'))
  },

  // PUT Request for media
  put (mediaObject) {
    const localMediaObject = Object.assign({}, mediaObject)
    return axios.post(
      '/media/' + localMediaObject.id + '?_method=PUT',
      formatObjectIntoFormData(localMediaObject),
      { 'Content-Type': 'multipart/form-data' }
    )
      .then(() => sendSuccessNotification(store, 'Media modifier avec succès !'))
  },

  // Patch Request for media
  patch (mediaObject) {
    const localMediaObject = Object.assign({}, mediaObject)
    return axios.patch(
      '/media/' + localMediaObject.id,
      clearMediaProperties(localMediaObject)
    )
      .then(() => sendSuccessNotification(store, 'Media modifier avec succès !'))
  },

  // Delete Request for media
  delete (mediaId) {
    return axios.delete('/media/' + mediaId)
      .then(() => sendSuccessNotification(store, 'Media supprimer !'))
  }
})
// Utils function

function formatObjectIntoFormData (object) {
  const bodyFormData = new FormData()
  bodyFormData.append('file', object.image)
  if (object.title !== undefined) { bodyFormData.append('title', object.title) }
  if (object.legend !== undefined) { bodyFormData.append('legend', object.legend) }
  if (object.target !== undefined) { bodyFormData.append('target', object.target) }
  return bodyFormData
}

function clearMediaProperties (object) {
  return clearObjectProperties(object, ['contentUrl', 'image'])
}
