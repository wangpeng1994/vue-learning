import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createAt: new Date().toLocaleString()
      })
      console.log(this.todoList)
      this.newTodo = ''  //之后 input 的值应该清空
    }
  }
})


