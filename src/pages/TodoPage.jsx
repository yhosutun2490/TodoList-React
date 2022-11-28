import { Footer, Header, TodoCollection, TodoInput } from 'components'
import { useState , useEffect } from 'react'
import { getTodos , createTodo ,patchTodo ,deleteTodo } from 'api/todo';
import { checkPermission } from 'api/auth'
import { useNavigate } from 'react-router-dom';
const dummyTools = [
    {
      "title": "Learn react-router",
      "isDone": true,
      "id": 1
    },
    {
      "title": "Learn to create custom hooks",
      "isDone": false,
      "id": 2
    },
    {
      "title": "Learn to use context",
      "isDone": true,
      "id": 3
    },
    {
      "title": "Learn to implement auth",
      "isDone": false,
      "id": 4
    }
  ]
const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState(dummyTools)
  const navigate =  useNavigate()
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
  async function handleToggleDone (todoId) {
    // 利用id找到該筆todo
    const targetTodo = todos.find( todo => todo.id === todoId)
    // 先更新資料庫，再更新本地端狀態
    try {
      await patchTodo({todoId,isDone: !targetTodo.isDone})
      setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isDone: !todo.isDone
        }
      }
      return todo
    }))
    } catch (error) {
       console.error('onChangeToggle error',error);
    }
 
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
  // 編輯完Save，更改後端todo isDone資料存入就行
  async function handleSave ({ id, title }) {
    try {
      await patchTodo({ id, title }) // 資料端執行
      // 本地端執行
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
    } catch(error) {
       console.error('onSave handler error',error);
    }
   
  }
  // handleDelete刪除功能
  async function handleDelete (todoId) {
    try {
      await deleteTodo(todoId)
      // 從todos刪掉該筆todoItem資料
    setTodos(preTodos => preTodos.filter(todo => todo.id !== todoId))
    } catch(error) {
      console.error('handleDelte error',error)
    }
  }

  // 由API獲取所有Todos資料
  useEffect (() => {
    // 定義初始資料fetch api
    const getTodosAsync = async ()=> {
      try {
        const apiTodos = await getTodos() // 等待資料回傳後渲染
        setTodos(apiTodos.map((todo) => ({...todo, isEdit: false})))
      } catch (error) {console.error('initialize todo error',error)}
    }
     getTodosAsync(); 
  },[])
  // 換頁後驗證功能
   useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        navigate('/login');
      }
      const result = await checkPermission(authToken);
      // 如果token時效過了
      if (!result) {
        navigate('/login');
      }
    };

    checkTokenIsValid();
  }, [navigate]);

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
