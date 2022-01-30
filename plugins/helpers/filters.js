export default () => ({
  constructor (filters, attributeTransformation = []) {
    const localFilters = Object.assign({}, filters)
    const { page, sortBy, sortDesc } = localFilters
    const params = {}

    const queryParameterTemplate = 'order[%s]'
    for (let i = 0; i < sortBy.length; i++) {
      let sortItem = sortBy[i]

      for (const key in attributeTransformation) {
        const value = attributeTransformation[key]
        if (sortItem === key) {
          sortItem = [value]
        }
      }
      const concatTrueParameter = queryParameterTemplate.replace('%s', sortItem)
      params[concatTrueParameter] = (sortDesc[i] ? 'desc' : 'asc')
    }
    params.page = page
    return params
  },
  getPageNumber (lastPageUri) {
    const url = new URL('http://www.randmhost.com/' + lastPageUri)
    return parseInt(url.searchParams.get('page'))
  }
})
