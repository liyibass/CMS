const { Text, Select, Relationship, File, Url } = require('@keystonejs/fields')
const { atTracking, byTracking } = require('@keystonejs/list-plugins')
const { ImageAdapter } = require('../lib/ImageAdapter')
const fs = require('fs')

const { LocalFileAdapter } = require('@keystonejs/file-adapters')
const fileAdapter = new LocalFileAdapter({
  src: './public/images',
  path: 'http://localhost:3000/images',
})

module.exports = {
  fields: {
    name: {
      label: '標題',
      type: Text,
      isRequired: true,
    },
    file: {
      label: '檔案',
      type: File,
      adapter: fileAdapter,
      isRequired: true,
    },
    urlOriginal: {
      type: Url,
      access: {
        create: false,
        update: false,
      },
    },
    urlDesktopSize: {
      type: Url,
      access: {
        create: false,
        update: false,
      },
    },
    urlTabletSize: {
      type: Url,
      access: {
        create: false,
        update: false,
      },
    },
    urlMobileSize: {
      type: Url,
      access: {
        create: false,
        update: false,
      },
    },
  },
  //   plugins: [atTracking(), byTracking()],

  adminConfig: {
    defaultColumns: 'name, image, createdAt',
    defaultSort: '-createdAt',
  },

  hooks: {
    // Hooks for create and update operations
    beforeChange: async ({ existingItem, resolvedData }) => {
      var origFilename
      if (typeof resolvedData.file !== 'undefined') {
        // resolvedData = true
        // when create or update newer image
        let fullFileName = resolvedData.file.filename
        let origFilename = resolvedData.file.originalFilename
        var id = resolvedData.file.id

        var stream = fs.createReadStream(`./public/images/${fullFileName}`)
        // upload image to gcs,and generate corespond meta data(url )
        const image_adapter = new ImageAdapter()
        let _meta = await image_adapter.sync_save(stream, fullFileName)

        resolvedData.urlOriginal = _meta.url.urlOriginal
        resolvedData.urlDesktopSize = _meta.url.urlDesktopSize
        resolvedData.urlMobileSize = _meta.url.urlMobileSize
        resolvedData.urlTabletSize = _meta.url.urlTabletSize

        // existingItem = null
        // create image
        if (typeof existingItem === 'undefined') {
          console.log('---create image---')
        } else {
          console.log('---update image---')
          // existingItem = true
          // update image
          // need to delete old image in gcs
          await image_adapter.delete(existingItem.file.filename)
          console.log('deleted old one')
        }
        // // update stored filename
        // // filename ex: 5ff2779ebcfb3420789bf003-image.jpg
        // const newFilename = formatImagePath(resolvedData)
        // resolvedData.file.filename = newFilename
        // // resolvedData.file.filename = newFilename
        // return { existingItem, resolvedData }
      } else {
        // resolvedData = false
        // image is no needed to update
        console.log('no need to update stream')
        //   resolvedData.file = existingItem.file
        //   const newFilename = formatImagePath(existingItem)
        //   resolvedData.file.filename = newFilename
        console.log('EXISTING ITEM', existingItem)
        console.log('RESOLVED DATA', resolvedData)
        //   return { existingItem, resolvedData }
      }
    },

    // When delete image, delete image in gcs as well
    beforeDelete: async ({ existingItem }) => {
      //       const image_adapter = new ImageAdapter(gcsDir)
      //       if (existingItem && typeof existingItem.file !== 'undefined') {
      //           await image_adapter.delete(
      //               existingItem.file.id,
      //               existingItem.file.originalFilename
      //           )
      //           console.log('deleted old one')
      //       }
    },
  },
  labelField: 'name',
}
