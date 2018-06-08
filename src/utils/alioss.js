var OSS = require('ali-oss').Wrapper
export function client(data) {
  var client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    bucket: 'fdfde4ba61ba4e4ea411a7d81a5894df'
  })
  return client
}
