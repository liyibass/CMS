// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase/app')

// Add the Firebase products that you want to use
require('firebase/auth')
require('firebase/firestore')

const {
  firebaseConfig: { firebaseConfig },
} = require('../configs/config')

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const MediaAdapter = class {
  constructor(fullFileName) {
    this.fullFileName = fullFileName
    this.meta = {}
    // this.firebaseDir = 'https://YOYO'
  }
}

module.exports = { MediaAdapter }
