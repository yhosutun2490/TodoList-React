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
  // 設置todo 輸入狀態
  const [inputValue, setInputValue] = useState('')
  // input onChange handler
  function handleInput (value) {
    setInputValue(value)
  }

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput inputValue={inputValue} onChange={handleInput}/>
      <TodoCollection todos={dummyTodos} />
      <Footer />
    </div>
  );
};

export default TodoPage;
