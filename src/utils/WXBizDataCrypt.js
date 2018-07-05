const crypto = require('crypto')

WXBizDataCrypt = (appId, sessionKey) => {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData =  (encryptedData, iv) => {
    let sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')
    try{
        // 解密
        const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        let decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')
        decoded = JSON.parse(decoded)
        return decoded
    } catch(err) { 
        return null 
    }
}

module.exports = WXBizDataCrypt
