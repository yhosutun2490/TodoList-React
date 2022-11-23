import './App.scss'
import { HomePage, TodoPage, LoginPage, SignUpPage } from './pages' // 引入4個主頁面
import { BrowserRouter, Routes, Route } from 'react-router-dom' // react路由模組

function App () {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='todo' element={<TodoPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
