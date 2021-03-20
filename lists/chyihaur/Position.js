// const { access } = require('./Permission.js');
const { Text } = require('@keystonejs/fields')

module.exports = {
  fields: {
    name: {
      label: '職位名稱',
      type: Text,
      isRequired: true,
    },
  },
}
