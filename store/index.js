export const state = () => ({
  notification: false,
  notificationStatus: 'info',
  notificationMessage: 'Bye Bye !',
  notificationOutAnimation: false,
  title: 'default title',
  showBreadcrumbs: true
})

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },
  loggedUser (state) {
    return state.auth.user
  },
  isAdmin (state) {
    for (let i = 0; i < state.auth.user.roles.length; i++) {
      if (state.auth.user.roles[i] === 'ROLE_ADMIN') {
        return true
      }
    }
    return false
  }
}

export const mutations = {
  updatePageTitle (state, newTitle) {
    if (typeof newTitle !== 'string' || newTitle === '') {
      state.title = undefined
    } else {
      state.title = newTitle
    }
  },
  showBreadcrumbs (state, newState) {
    if (typeof newState !== 'boolean') {
      state.showBreadcrumbs = true
    } else {
      state.showBreadcrumbs = newState
    }
  },
  sendNotification (state, object) {
    state.notification = true
    state.notificationStatus = object.status

    // Set up custom message for notification
    if (object.message) {
      state.notificationMessage = object.message
    }
    // Error handler
    if (object.error) {
      if (object.error.response) {
        // Request made and server responded
        if (object.error.response.data.message !== undefined && object.error.response.data.code !== undefined) {
          const concatErrorMessage = 'Status code : ' + object.error.response.data.code + ' Message d\'erreur : ' + object.error.response.data.message
          state.notificationMessage = concatErrorMessage
        } else {
          state.notificationMessage = object.error.response.data
        }
      } else if (object.error.request) {
        // The request was made but no response was received
        state.notificationMessage = object.error
      } else {
        // Something happened in setting up the request that triggered an Error
        state.notificationMessage = object.error
      }
    }
  },
  resetNotification (state) {
    state.notification = false
    state.notificationMessage = 'Bye Bye !'
  },
  startOutAnimation (state) {
    state.notificationOutAnimation = true
  },
  endOutAnimation (state) {
    state.notificationOutAnimation = false
  },
  setRole (state, role) {
    state.role = role
  }
}
