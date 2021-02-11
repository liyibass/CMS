// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase/app')

// Add the Firebase products that you want to use
require('firebase/auth')
require('firebase/firestore')

const { firebaseConfig } = require('../configs/config')

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const MediaAdapter = class {
  constructor(fullFileName) {
    this.fullFileName = fullFileName
    this.meta = {}
    // this.firebaseDir = 'https://YOYO'
  }

  _uploadToFirebase(stream, resized_filename) {
    if (!resized_filename) {
      console.log('upload original image to firebase(ImageAdapter)')
    } else {
      console.log('upload resized image to firebase(ImageAdapter)')
    }
  }
}

module.exports = { MediaAdapter }
