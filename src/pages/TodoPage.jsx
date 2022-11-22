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
  const [todos,setTodos] = useState(dummyTodos) 
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

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput inputValue={inputValue} onChange={handleInput} onAddTodo={handleAddTodo}/>
      <TodoCollection todos={todos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
