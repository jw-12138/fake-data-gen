const fs = require('fs')
const slog = require('single-line-log').stdout
let text
let output = []

fs.readFile('name_output_16.txt', 'utf8', function (err, data) {
  text = data
  let text_arr = text.split('')
  let i = 0

  let s = setInterval(() => {
    if (i == text_arr.length - 1) {
      clearInterval(s)
      merge()
    }
    let str = text_arr[i]
    if(i % 2 == 0){
      output.push(str)
    }
    let percent = ((i + 1) / text_arr.length) * 100
    percent = percent.toFixed(3)
    slog(`processing...\n ${i + 1} / ${text_arr.length} || ${percent}%`)

    i++
  }, 0)
})

function merge() {
  let o = output.join('')
  fs.writeFile('./name_output_2.txt', o, {}, function () {})
}