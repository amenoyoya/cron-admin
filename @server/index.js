const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

/**
 * process.env form .env
 */
require('dotenv').config()

// ※ Express 4.16 以降、Body-Parser機能は標準搭載されている
// ※ 4.16 未満のバージョンを使っている場合は、別途 body-parser パッケージのインストールが必要
app.use(express.json()); // クライアントデータを JSON 形式で取得可能にする
app.use(express.urlencoded({ extended: true })); // 配列型のフォームデータを取得可能にする

// ※ Express 4.X 以降 cookie-parser は標準搭載されていないため、別途インストール
app.use(cookieParser())

// Originセキュリティ
app.use((req, res, next) => {
  // 同一サーバからのリクエストのみ許可
  // if (req.header('origin') !== process.env.APP_URI) {
  //   return res.status(403).send() // 403 Forbidden
  // }
  console.log(req.ip)
  next()
})

// API base URI
const basepath = ''

/**
 * NeDB REST API: /nedb/*
 */
app.use(`${basepath}/nedb`, require('./api_nedb'))

/**
 * Utility REST API: /util/*
 */
app.use(`${basepath}/util`, require('./api_util'))

/**
 * Nuxt system REST API: /nuxt/*
 */
app.use(`${basepath}/nuxt`, require('./api_nuxt'))

module.exports = {
  path: '/server',
  handle: app,
}

// // listen: http://localhost:3333/
// const port = process.env.SERVER_PORT || 3333
// console.log(`Backend server\nListening on: http://localhost:${port}/`)
// app.listen(port)