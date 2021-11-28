export default function ({ store, redirect }) {
  if (!store.getters.isAdmin) {
    store.commit('sendNotification', {
      status: 'info',
      message: 'Vous n\'avez pas les droits nécessaire pour acceder a cette page !'
    })
    return redirect('/dashboard')
  }
}
