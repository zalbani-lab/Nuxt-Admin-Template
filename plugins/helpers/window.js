export default () => ({
  scrollToTop () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  reloadPage () {
    location.reload()
  }
})
