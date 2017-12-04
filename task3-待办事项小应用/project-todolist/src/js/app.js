var appTodo = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  created: function(){
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.todoList)
      window.localStorage.setItem('myTodos', dataString)

      let unCommitedString = JSON.stringify(this.newTodo)
      window.localStorage.setItem('unCommited', unCommitedString)
    }

    let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []

    let oldUnCommitedString = window.localStorage.getItem('unCommited')
    let oldUnCommited = JSON.parse(oldUnCommitedString)
    this.newTodo = oldUnCommited || ''
  },
  methods: {
    addTodo: function(){
      if(!this.newTodo.trim()){  //去除首尾空格后是否仍为空
        this.newTodo = ''
        return
      }
      this.todoList.push({
        title: this.newTodo,
        createAt: new Date().toLocaleString().slice(5),
        done: false //添加一个 done 属性用来标记已完成
      })
      this.newTodo = ''  //之后 input 的值应该清空
    },
    deleteTodo: function(todo){
      let index = this.todoList.indexOf(todo)
      this.todoList.splice(index, 1)
    },
    clearAll: function(){
      this.todoList = []
    }
  }
})


// 标记为完成 思路：
// 给每一个 todo 添加一个 done 属性
// 给每一个 <li> 里面添加一个 checkbox
// 参考 https://cn.vuejs.org/v2/guide/forms.html#复选框 ，将 done 和 checkbox 双向绑定。

// 删除todo 思路：
// 在每一项后面添加一个删除按钮
// 绑定事件，点击按钮，调用回调函数，传入当前todo，从 data.todoList 中删除该项


// 我们发现每次刷新页面，待办就没了。
// 这是因为这些代码都保存在内存里，而内存是无法持久的。所以我们选择保存在 localStorage 中。
// 思路：
// 在用户关闭页面前，将数据保存在 localStorage 里
// 在用户进入页面后，立刻读取 localStorage

/*
挑战
1. 你能否把 newTodo 的内容也保存下来，下次用户进入页面时，会显示之前输入但是还未提交的 newTodo 内容？
   思路：
   页面卸载之前，检查newTodo是否有内容，有则保存在 localStorage 中(localStorage 会自动覆盖同名数据，即只储存一个newTodo)
   在用户每次进入页面后，立即读取 localStorage 内容，检查是否有 newTodo，有则写入当前 newTodo


2. 你能否把这个页面美化一下？
3. 你能否添加「友好的」时间展示，让用户知道这个 todo 是什么时候创建的。


*/