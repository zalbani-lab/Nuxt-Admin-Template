import { sendSuccessNotification } from '~/plugins/api/globalFunc'

export default (axios, store) => ({
  // Get all emails
  getAll () {
    return axios.get('/emails')
  },
  // Get emails filtered
  getFiltered (filters) {
    return axios.get('/emails', { params: filters })
  },

  post (emailObject) {
    const localEmailObject = Object.assign({}, emailObject)
    return axios.post('/emails', clearEmailObjectProperties(localEmailObject))
      .then(() => sendSuccessNotification(store, 'Email envoye avec succès !'))
  }
})

function clearEmailObjectProperties (object) {
  if (object.replyAddress === '') {
    delete object.replyAddress
  }
  return object
}
