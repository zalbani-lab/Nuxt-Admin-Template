export default function ({ $axios, store }) {
  $axios.onError((error) => {
    store.commit('sendNotification', {
      status: 'error',
      error
    })
  })
}
