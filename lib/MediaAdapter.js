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

class MediaAdapter {
  constructor() {
    this.firebaseDir = 'https://YOYO'
  }

  uploadToFirebase(stream) {
    console.log('upload to firebase(MediaAdapter)')

    // console.log(firebase)
  }
}

module.exports = { MediaAdapter }
