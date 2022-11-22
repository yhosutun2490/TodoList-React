import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  // 設置todo input 輸入狀態
  const [inputValue, setInputValue] = useState('')
  // 設置所有todo task 狀態
  const [todos, setTodos] = useState(dummyTodos) 
  // input onChange handler
  function handleInput (value) {
    setInputValue(value)
  }
  // addTodo handler
  function handleAddTodo () {
    // inputValue 長度=0 直接return
    if (!inputValue.length) {
      return 
    }
    // 如果有輸入內容，更新至todos，注意id不和原本1~4重複
    setTodos( preTodos => {
      return [
        ...preTodos,
        {
          id: Math.random()*100 + (inputValue.length + 1), 
          title: inputValue,
          isDone: false
        }
      ]
    })
    // 清空原本 inputValue 輸入值
    setInputValue('')
  }
   function handleKeyDown () {
     // inputValue 長度=0 直接return
    if (!inputValue.length) {
      return 
    }
    // 如果有輸入內容，更新至todos，注意id不和原本1~4重複
    setTodos( preTodos => {
      return [
        ...preTodos,
        {
          id: Math.random()*100 + (inputValue.length + 1), 
          title: inputValue,
          isDone: false
        }
      ]
    })
    // 清空原本 inputValue 輸入值
    setInputValue('')
   }
   // toggle更動todo完成/未完成
   function handleToggleDone (todoId) {
    // 找到該筆todo id 並更新isDone屬性資料
    setTodos(todos.map ( todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isDone: !todo.isDone,
        }
      }
      return todo
    }))
   }

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput inputValue={inputValue} onChange={handleInput} onAddTodo={handleAddTodo} onKeyPress={handleKeyDown}/>
      <TodoCollection todos={todos} onToggleDone={handleToggleDone} />
      <Footer />
    </div>
  );
};

export default TodoPage;
