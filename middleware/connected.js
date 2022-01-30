export default function ({ store, redirect }) {
  if (!store.state.auth.loggedIn) {
    store.commit('sendNotification', {
      status: 'info',
      message: 'Vous devez etre connecter pour acceder a cette page !'
    })
    return redirect('/')
  } else {
    store.commit('setRole', store.state.auth.user.roles)
  }
}
