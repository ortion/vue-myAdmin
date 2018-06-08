var OSS = require('ali-oss').Wrapper
export function client(data) {
  var client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIKWWEWhqqYURR',
    accessKeySecret: 'iuhKgozK0NO28QGGxcUEA2yhRu7VVz',
    bucket: 'fdfde4ba61ba4e4ea411a7d81a5894df'
  })
  return client
}
