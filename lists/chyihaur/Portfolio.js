// const { access } = require('./Permission.js');
const { Text, CalendarDay, Relationship } = require('@keystonejs/fields')

module.exports = {
  fields: {
    name: {
      label: '標題',
      type: Text,
      isRequired: true,
    },
    date: {
      label: '日期',
      type: CalendarDay,
    },
    coverPhoto: {
      label: '封面',
      type: Relationship,
      ref: 'Image',
      many: false,
    },
    photos: {
      label: '圖片集',
      type: Relationship,
      ref: 'Image',
      many: true,
    },
    description: {
      label: '內文',
      type: Text,
      isMultiline: true,
    },
  },
}
