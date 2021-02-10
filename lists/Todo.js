const { Text, CalendarDay, Checkbox } = require('@keystonejs/fields')

module.exports = {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do' },
    // existing fields
    description: {
      type: Text,
      isRequired: true,
    },
    isComplete: {
      type: Checkbox,
      defaultValue: false,
    },
    // added fields
    deadline: {
      type: CalendarDay,
      dateFrom: '2019-01-01',
      dateTo: '2029-01-01',
      isRequired: false,
      defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10), // Today's date
    },
    assignee: {
      type: Text,
      isRequired: true,
    },
  },
}
