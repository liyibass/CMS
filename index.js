const { Keystone } = require('@keystonejs/keystone')
const { Text, Checkbox, Password } = require('@keystonejs/fields')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { StaticApp } = require('@keystonejs/app-static')

const { createItems } = require('@keystonejs/server-side-graphql-client')

const { admin, mongoUri } = require('./configs/config')
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose')
const PROJECT_NAME = 'CMS'
const adapterConfig = {
  mongoUri: mongoUri,
}
const { app } = require('./configs/config.js')
const lists = require(`./lists/${app.project}`)

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  //   onConnect: async (keystone) => {
  //     await createItems({
  //       keystone,
  //       listKey: 'User',
  //       items: [
  //         {
  //           data: {
  //             name: admin.name,
  //             email: admin.email,
  //             password: admin.password,
  //           },
  //         },
  //       ],
  //     })
  //   },
})

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
  },
})

// create lists
for (var name in lists) {
  keystone.createList(name, lists[name])
}

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
    new StaticApp({ path: '/', src: 'public' }),
  ],
}
