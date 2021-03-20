const resolvedDataUrlList = [
  'urlOriginal',
  'urlDesktopSize',
  'urlMobileSize',
  'urlTabletSize',
]
const metaUrlList = [
  'urlOriginal',
  'urlDesktopSize',
  'urlMobileSize',
  'urlTabletSize',
]

const distributeUrlsToResolvedData = (resolvedData, meta) => {
  resolvedDataUrlList.forEach((urlItem, index) => {
    // resolvedData.urlOriginal = meta.url.urlOriginal
    resolvedData[urlItem] = meta.url[metaUrlList[index]]
  })
}

module.exports = { distributeUrlsToResolvedData }
