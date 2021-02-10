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
  sync_save(stream, fullFileName) {
    // console.log('sync_save(ImageAdapter)')
    // let name = origFilename.split('.')[0]
    // let ext = origFilename.split('.')[1]

    let url = {}
    this.saveDesktopSizeImage(stream, url, fullFileName)
    this.saveVariusSizeImage(stream, url, fullFileName)
    // this.deleteLocalTempFile(fullFileName)

    let _meta = {}
    _meta.url = url
    return _meta
  }

  saveDesktopSizeImage(stream, url, fullFileName) {
    // const gcsUploadPath = `${this.gcsDir}${id}.${ext}`
    // const originalSize = this.bucket.file(gcsUploadPath)
    // create url which link to gcs
    url.urlOriginal = `${firebaseUrlBase}${imageUrlBase}${fullFileName}`
  }

  saveVariusSizeImage(stream, url, fullFileName) {
    let name = fullFileName.split('.')[0] //id-AA
    let ext = fullFileName.split('.')[1] //.png

    try {
      for (const key in resizeTarget) {
        //   id-AA-moblie.png
        const resized_filename = `${name}-${key}.${ext}`

        //Save image to gcs
        // this.saveGCS(resized_filename, stream, key, id)
        // Create url which link to gcs
        this.createUrlToUrlObject(key, url, resized_filename)
      }
    } catch (err) {
      console.log(err)
    }
  }

  createUrlToUrlObject(key, url, resized_filename) {
    switch (key) {
      case 'mobile':
        url.urlMobileSize = `${firebaseUrlBase}${imageUrlBase}${resized_filename}`
      case 'tablet':
        url.urlTabletSize = `${firebaseUrlBase}${imageUrlBase}${resized_filename}`
      case 'desktop':
        url.urlDesktopSize = `${firebaseUrlBase}${imageUrlBase}${resized_filename}`
    }
  }

  deleteLocalTempFile(fullFileName) {
    const localTempFilePath = `./public/images/${fullFileName}`
    fs.unlink(localTempFilePath, (err) => {
      if (err) {
        throw err
      }
      console.log(`${localTempFilePath} is deleted`)
    })
  }
}

module.exports = { ImageAdapter }
