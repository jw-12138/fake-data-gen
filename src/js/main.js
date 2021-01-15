;(function (Vue, axios) {
  let app = new Vue({
    el: '#app',
    data: {
      loaded: false,
      prop: [
        {
          id: 'name',
          label: '姓名',
          first_name_db: null,
          last_name_db: null,
          gen_list: []
        }
      ]
    },
    mounted: function () {
      let _this = this
      _this.getNamesDB()
      _this.gen = new _this.gen()
      _this.loaded = true
    },
    methods: {
      generate: function () {
        let _this = this
        let names = 200
        let i = 0
        let s = setInterval(() => {
          i++
          if (i < names) {
            _this.gen.name(_this)
          } else {
            clearInterval(s)
          }
        }, 0)
      },
      getRandomInt: function (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
      },
      getNamesDB: function () {
        let _this = this
        axios({
          method: 'get',
          url: 'data/first-name.json'
        }).then(function (res) {
          _this.first_name_db = res.data
        })
        axios({
          method: 'get',
          url: 'name_output_2.txt',
          responseType: 'text'
        }).then(function (res) {
          _this.last_name_db = res.data
        })
      },
      gen: function () {
        this.name = function (v) {
          let luck = v.getRandomInt(0, 2000)
          let first_name
          if(luck == 1){
            first_name = v.first_name_db.rare[v.getRandomInt(0, v.first_name_db.rare.length)]
          }else{
            first_name = v.first_name_db.common[v.getRandomInt(0, v.first_name_db.common.length)]
          }

          let last_name = []
          let last_name_arr = v.last_name_db.split('')
          let last_name_sum = v.last_name_db.length
          let last_name_length = v.getRandomInt(1, 3)
          for (let i = 0; i < last_name_length; i++) {
            let element = last_name_arr[v.getRandomInt(0, last_name_sum)]
            last_name.push(element)
          }

          last_name = last_name.join('')

          console.log(first_name + last_name)
        }
      }
    },
    watch: {}
  })
})(Vue, axios)
