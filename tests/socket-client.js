/**
 * WebSocket 送受信テスト
 * 
 * # Server 起動: http://localhost:3333
 * $ node @server/index.js
 * 
 * # Client 実行: 10秒ごとに websocket.message イベント送信
 * $ node tests/socket-client.js
 * 
 * # [Server]
 * # 10秒ごとに Client から投げられてくるメッセージ（現在日時）を表示
 * get message: {現在日時}
 * 
 * # [Client]
 * # websocket.message はオウム返しされるため、自分が送ったメッセージ（現在日時）がそのまま受信される
 * get message from websocket: {現在日時}
 */
const schedule = require('node-schedule')
const client = require('socket.io-client')
const dayjs = require('dayjs')

dayjs.locale('ja')

// http://localhost:3333 と WebSocket 接続
const socket = client.connect('http://localhost:3333')

/**
 * 10秒ごとに現在日時を WebSocket サーバに送信する cron 登録
 */
schedule.scheduleJob('*/10 * * * * *', () => {
  // message イベントとして送信
  socket.emit('message', dayjs().format())
})

/**
 * socket: connect イベント
 */
socket.on('connect', () => {
  console.log('connected with ws://localhost:3333')
})

/**
 * socket: message イベント
 */
socket.on('message', msg => {
  // ws://localhost:3333 'message' event から送信されたデータを出力
  console.log('get message from websocket: ', msg)
})
