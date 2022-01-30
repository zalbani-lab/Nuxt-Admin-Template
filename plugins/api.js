import Log from './api/log'
import Email from './api/email'
import User from './api/user'
import Animation from './api/animation'
import Media from './api/media'
import Category from './api/category'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    log: Log(context.$axios),
    email: Email(context.$axios, context.store),
    user: User(context.$axios, context.store),
    animation: Animation(context.$axios, context.store),
    media: Media(context.$axios, context.store),
    category: Category(context.$axios, context.store)
  }

  // Inject $api
  inject('api', factories)
}
