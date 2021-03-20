// const { access } = require('./Permission.js');
const { Text, Relationship } = require('@keystonejs/fields')

module.exports = {
  fields: {
    name: {
      label: '名字',
      type: Text,
      isRequired: true,
    },
    engName: {
      label: '英文名字',
      type: Text,
    },
    position: {
      label: '職位',
      type: Relationship,
      ref: 'Position',
      isRequired: true,
    },
    snapshotUrl: {
      label: '大頭照',
      type: Relationship,
      ref: 'Image',
      many: false,
    },
    headerUrl: {
      label: '大頭照',
      type: Relationship,
      ref: 'Image',
      many: false,
    },
  },
  adminConfig: {
    defaultColumns: 'name, position,',
    defaultSort: '-name',
  },
  labelField: 'name',
}
