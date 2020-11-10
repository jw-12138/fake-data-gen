const fs = require('fs')
const slog = require('single-line-log').stdout
let text
let output = []

fs.readFile('name.txt', 'utf8', function (err, data) {
  text = data
  let text_arr = text.split(/[\n]/)
  let i = 0

  let s = setInterval(() => {
    if (i > text_arr.length) {
      clearInterval(s)
      merge()
    }
    let str = text_arr[i]
    str = str.substr(1)
    output.push(str)

    let percent = i / text_arr.length * 100
    percent = percent.toFixed(3)
    slog(`processing...\n ${i} / ${text_arr.length} || ${percent}%`)

    i++
  }, 0);
})


function merge() {
  output.join('')
  fs.writeFile('./name_output.txt', output, {}, function () {})
}


