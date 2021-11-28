export default axios => ({
  // Get all logs
  getAll () {
    return axios.get('/logs')
  },
  // Get logs filtered
  getFiltered (filters) {
    return axios.get('/logs', { params: filters })
  }
})
