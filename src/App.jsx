import './App.scss';
import { HomePage, TodoPage, LoginPage, SignUpPage } from './pages'; // 引入4個主頁面
import { HashRouter, Routes, Route } from 'react-router-dom'; // react路由模組
import { AuthProvider } from './contexts/AuthContext';
// 新增 basename
const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <div className="app">
      <HashRouter basename={basename}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
