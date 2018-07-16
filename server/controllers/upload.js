const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const path = require('path')
const _ = require('lodash')

// 文件上传
router.post('/', (req, res) => {
  var form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, '../upload')
  //console.log(form.uploadDir)
  form.keepExtensions = true
  form.maxFileSize = 20 * 1024 * 1024

  form.parse(req, function(err, fields, files) {
    console.log(fields)
    res.send(
      _.map(files, e => {
        return {
          path: e.path.replace(form.uploadDir, '/upload'),
          name: e.name,
          type: e.type,
          size: e.size
        }
      })
    )
  })
  // var filename = req.files.upload.path //文件存放绝对路径
  // var title = req.files.upload.name //上传后解析过的文件名
  //res.send('ok')
})


module.exports = router