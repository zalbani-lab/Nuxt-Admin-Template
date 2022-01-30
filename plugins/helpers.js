import Filters from './helpers/filters'
import Window from './helpers/window'
import FormRules from './helpers/formRules'
import ObjectEquality from './helpers/objectEquality'

export default (context, inject) => {
  const factories = {
    filters: Filters(),
    window: Window(),
    formRules: FormRules(),
    objectEquality: ObjectEquality()
  }
  // Inject $helpers
  inject('helpers', factories)
}
