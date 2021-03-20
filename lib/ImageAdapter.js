const { MediaAdapter } = require('./MediaAdapter.js')
const fs = require('fs')
const {
  storage: { firebaseUrlBase, imageUrlBase },
} = require('../configs/config')

const resizeTarget = {
  mobile: { height: 450, width: 800 },
  tablet: { height: 675, width: 1200 },
  desktop: { height: 713, width: 1268 },
}

class ImageAdapter extends MediaAdapter {
  constructor(...args) {
    super(...args)
    this.meta = { url: {} }
  }

  uploadImages(stream) {
    this.saveOriginalImage(stream)
    this.saveVariusSizeImages(stream)
    this._deleteLocalTempFile(this.fullFileName)
  }

  saveOriginalImage(stream) {
    // Upload image to firebase
    this._uploadToFirebase(stream)
    // create url
    this._generateCorrespondingUrl(this.fullFileName)
  }

  saveVariusSizeImages(stream) {
    for (const key in resizeTarget) {
      // generate resized filename
      const resized_filename = this._generateResizedFilename(key)
      // Upload image to firebase
      this._uploadToFirebase(stream, resized_filename)
      // Create url which link to firebase
      this._generateCorrespondingUrl(resized_filename, key)
    }
  }

  _deleteLocalTempFile() {
    const localTempFilePath = `./public/images/${this.fullFileName}`
    fs.unlink(localTempFilePath, (err) => {
      if (err) {
        throw err
      }
      console.log(`${localTempFilePath} is deleted`)
    })
  }

  async delete(id, originalFilename) {
    // console.log('===delete in image adapter===')
    // let imageList = []
    // let name = originalFilename.split('.')[0]
    // let ext = originalFilename.split('.')[1]ƒ
    // const gcsOriginalImgDir = `${this.gcsDir}${id}.${ext}`
    // imageList.push(gcsOriginalImgDir)
    // for (const key in resizeTarget) {
    //     const imageDir = `${this.gcsDir}${id}-${key}.${ext}`
    //     imageList.push(imageDir)
    // }
    // imageList.forEach(async (gcsImageDir) => {
    //     await this.bucket.file(`${gcsImageDir}`).delete()
    //     console.log(`gs://${gcsImageDir} deleted.`)
    // })
    // console.log(`gs://${this.gcsDir}${oldImageFolderName} deleted.`)
  }

  _generateResizedFilename(key) {
    const name = this.fullFileName.split('.')[0] //id-AA
    const ext = this.fullFileName.split('.')[1] //.png

    // id-AA-moblie.png
    return `${name}-${key}.${ext}`
  }

  _generateCorrespondingUrl(fullFileName, key) {
    switch (key) {
      case 'mobile':
        this.meta.url.urlMobileSize = `${firebaseUrlBase}${imageUrlBase}${fullFileName}`
        break
      case 'tablet':
        this.meta.url.urlTabletSize = `${firebaseUrlBase}${imageUrlBase}${fullFileName}`
        break
      case 'desktop':
        this.meta.url.urlDesktopSize = `${firebaseUrlBase}${imageUrlBase}${fullFileName}`
        break
      default:
        this.meta.url.urlOriginal = `${firebaseUrlBase}${imageUrlBase}${fullFileName}`
        break
    }
  }
}

module.exports = { ImageAdapter }
