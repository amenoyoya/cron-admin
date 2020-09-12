/**
 * WebSocket 通信を介した cron スケジューリング
 * 
 * # Database 削除
 * $ rm nedb/@crons.db
 * $ rm nedb/@jobs.db
 * $ rm nedb/@end_jobs.db
 * 
 * # Server 起動
 * $ node @server/index.js
 * 
 * # Client 実行: WebSocket cron イベントを受信して出力
 * $ node tests/socket-cron.js
 */
const axios = require('axios')
const client = require('socket.io-client')
const dayjs = require('dayjs')

dayjs.locale('ja')

// http://localhost:3333 と WebSocket 接続
const socket = client.connect('http://localhost:3333')

/**
 * socket: connect イベント
 */
socket.on('connect', () => {
  console.log('connected with ws://localhost:3333')
})

/**
 * socket: cron イベント
 */
socket.on('cron', data => {
  // 定期実行されたジョブの内容を出力
  console.log(data)
})

/**
 * NsDB.@crons に定期実行ジョブ登録
 */
const crons = [
  { title: '毎分実行', schedule: '* * * * *' },
  { title: '3分毎実行', schedule: '*/3 * * * *' },
  { title: '5分毎実行', schedule: '*/5 * * * *' },
  { title: '10分毎実行', schedule: '*/10 * * * *' },
  { title: '30分毎実行', schedule: '*/30 * * * *' },
]
axios.post('http://localhost:3333/nedb/@crons/', crons)
