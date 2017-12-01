import bar from './bar';
import Vue from 'vue'

bar()

var app = new Vue({
  el: '#xxx',
  data: {
    message: 'Hello World！'
  }
})

// app.message = '修改了message'