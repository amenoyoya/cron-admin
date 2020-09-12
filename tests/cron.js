/**
 * cron-parser動作確認
 *
 * $ node tests/cron.js
 */
const parser = require('cron-parser')
const dayjs = require('dayjs')

dayjs.locale('ja')

const schedules = [
  '* * * * *', // 毎分
  '*/10 * * * *', // 10分毎
  '0 9 * * 1', // 毎週月曜日9:00
  '2020 09 12', // エラーになる書式
]

for (const schedule of schedules) {
  try {
    const interval = parser.parseExpression(schedule)
    console.log(schedule, dayjs(interval.next().toString()).format())
  } catch (error) {
    console.log(schedule, error)
  }
}