const { makeid, formatBytes, clockString, pickRandom, sleep, getBuffer, fetchJson, shortUrl, getFile, getTime, processTime, ytv, yta, ytDownload, tiktokDownloader, downloader, doujindesuDl, toPDF, anonfilesDl, uploadFromPath, reqBuffer } = require('./function.js')
const { MessageType, compressImage, whatsappID } = require('@adiwajshing/baileys')
const { promisify, format } = require('util')
const os = require('os')
const cp = require('child_process')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
const nhentai = require('nhentai-node-api')
const _gis = require('g-i-s')
const googleIt = require('google-it')
const yts = require('yt-search')
const removebg = require('removebg-id')
const sagiri = require('sagiri')
const hx = require('hxz-api')
const xa = require('xfarr-api')
const deepai = require('deepai')
deepai.setApiKey('31c3da72-e27e-474c-b2f4-a1b685722611')
const ameClient = require('amethyste-api')
const ameApi = new ameClient('1f486b04b157f12adf0b1fe0bd83c92a28ce768683871d2a390e25614150d0c8fa404fd01b82a5ebf5b82cbfa22e365e611c8501225a93d5d1e87f9f420eb91b')
const moment = require('moment-timezone')

const gis = promisify(_gis)
const sauce = sagiri('96a418eb1f0d7581fad16d30e0dbf1dbbdf4d3bd')
const isUrl = url => url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
const app = express()
const port = process.env.PORT || 8000 || 3000


// const WAConnection = simple.WAConnection(_WAConnection)

let prefix = ':'

app.set('json spaces', 2)
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(function(err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

const storage = multer.diskStorage({ destination: 'public/file', filename: (req, file, cb) => cb(null, makeid(10) + path.extname(file.originalname)) })
const upload = multer({ storage, limits: { fileSize: 10000000 }}) // 10 MB

app.get('/', (req, res) => res.send('WELCOME TO BABASAPI'));


// RemoveBG
app.get('/api/removebg', (req, res) => {
	let url = req.query.url
	if (!(url || isUrl(url))) return res.status(400).json({ message: "Input parameter url" })
	removebg.FromUrl(url, '2mZbr62TiNKYw3rFPPtb4BYn').then(async () => res.status(200).sendFile(process.cwd() + '/hasil-url.png')).catch(err => res.status(400).json({ error: String(err) }))
})


// ytplay
app.get('/api/ytplay', (req, res) => {
	let query = req.query.query || req.query.url || req.query.q
	if (!query) return res.status(400).json({ message: "Input parameter query/url" })
	ytDownload(query).then(result => res.status(200).json({ status: true, result })).catch(err => res.status(400).json({ error: String(err) }))
})

// play
app.get('/api/play', async (req, res) => {
	let query = req.query.query || req.query.q
	if (!query) return res.status(400).json({ message: "Input parameter query" })
	let { videos } = await yts(query)
	if (videos.length < 1) return res.status(400).json({ message: "Music not found" })
	yta(videos[0].url).then(result => res.status(200).json({ status: true, result })).catch(err => res.status(400).json({ error: String(err) }))
})



app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
	
})
