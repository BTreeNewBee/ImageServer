import express from 'express'
import nodeHtmlToImage from 'node-html-to-image'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url) // 这里不能声明__filename,因为已经有内部的__filename了，重复声明会报错
const _dirname = path.dirname(filename)
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/image', function (req, res) {
  nodeHtmlToImage({
    output: './image.png',
    html: req.body['html']
  })
    .then(() => {
      res.sendFile(_dirname + '/image.png')
    })
})
app.listen(3000)