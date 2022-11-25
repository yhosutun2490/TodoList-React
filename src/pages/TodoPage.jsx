import { Footer, Header, TodoCollection, TodoInput } from 'components'
import { useState , useEffect } from 'react'
import { getTodos , createTodo } from 'api/todo';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4
  }
]

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState(dummyTodos)
  // input onChange handler
  function handleInput (value) {
    setInputValue(value)
  }
  // addTodo handler
  async function  handleAddTodo () {
    // inputValue 長度=0 直接return
    if (!inputValue.length) {
      return
    }
    // 新增Todo資料到後端資料庫，並拉回新資料更新狀態
    try {
      const data = await createTodo({
      title: inputValue,
      isDone: false
    })
     setTodos(preTodos => {
      return [
        ...preTodos,
        {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false
        }
      ]
    })
    // 清空原本 inputValue 輸入值
    setInputValue('')
    } catch(error) {console.error(error)} 
  }
  async function handleKeyDown () {
     // inputValue 長度=0 直接return
    if (!inputValue.length) {
      return
    }
    // 新增Todo資料到後端資料庫，並拉回新資料更新狀態
    try {
      const data = await createTodo({
      title: inputValue,
      isDone: false
    })
     setTodos(preTodos => {
      return [
        ...preTodos,
        {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false
        }
      ]
    })
    // 清空原本 inputValue 輸入值
    setInputValue('')
    } catch(error) {console.error(error)} 
  }
  // toggle更動todo完成/未完成
  function handleToggleDone (todoId) {
    // 找到該筆todo id 並更新isDone屬性資料
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isDone: !todo.isDone
        }
      }
      return todo
    }))
  }
  // handleChangeMode function {id,isEdit} 解構傳入的參數
  function handleChangeMode ({ id, isEdit }) {
    // 呼叫setTodos 更新該筆Todo isEdit屬性
    setTodos((preTodos) => {
      return preTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit
          }
        } else {
          return {
            ...todo,
            isEdit: false
          }
        }
      })
    })
  }
  // 編輯完Save
  function handleSave ({ id, title }) {
    setTodos((preTodos) => {
      return preTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false
          }
        } else {
          return todo
        }
      })
    })
  }
  // handleDelete刪除功能
  function handleDelete (todoId) {
    // 從todos刪掉該筆todoItem資料
    setTodos(preTodos => preTodos.filter(todo => todo.id !== todoId))
  }

  // 由API獲取所有Todos資料
  useEffect (() => {
    const getTodosAsync = async ()=> {
      try {
        const todos = await getTodos // 等待資料回傳後渲染
        setTodos(todos.map((todo) => ({...todo, isEdit: false})))
      } catch (error) {console.error(error)}
    }
  },[])

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput inputValue={inputValue} onChange={handleInput} onAddTodo={handleAddTodo} onKeyPress={handleKeyDown} />
      <TodoCollection todos={todos} onToggleDone={handleToggleDone} onChangeMode={handleChangeMode} onSave={handleSave} onDelete={handleDelete} />
      <Footer todosLength={todos.length} />
    </div>
  )
}

export default TodoPage
