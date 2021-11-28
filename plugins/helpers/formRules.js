export default () => ({
  required: value => !!value || 'Required.',
  email: (value) => { return value === '' || /.+@.+\..+/.test(value) ? true : 'E-mail must be valid' }
})
