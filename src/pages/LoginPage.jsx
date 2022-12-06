import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom'; //轉址功能
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // 引入context狀態和函式(login)

const LoginPage = () => {
  // login page資料狀態
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // navigate callback
  const { isAuthenticated, login } = useAuth();

  async function handleClick() {
    // 登入輸入框有一個沒填不做事
    if (username.length === 0 || password.length === 0) {
      return;
    }
    const success = await login({ username, password });
    // 登入驗證成功 success = true
    if (success) {
      // 登入成功視窗
      Swal.fire({
        title: '登入成功!',
        icon: 'success',
        timer: 2500,
        position: 'top',
        showCloseButton: false,
        showConfirmButton: false,
      });
      // 成功後轉向todo頁面
      navigate('/todo');
      return;
    }
    // 登入失敗跳窗
    Swal.fire({
      title: '登入失敗!',
      icon: 'error',
      timer: 2500,
      position: 'top',
      showCloseButton: false,
      showConfirmButton: false,
    });
  }
  // 如果畫面重整或換頁，使用者登入狀態保持，利用localStorage token驗證
  useEffect(() => {
    const checkTokenIsValid = async () => {
      // 利用context傳來的登入狀態判斷
      if (!isAuthenticated) {
        return;
      }
      if (isAuthenticated) {
        navigate('/todo');
      }
    };
    checkTokenIsValid();
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="姓名"
          value={username}
          placeholder="請輸入大名"
          onChange={setName}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          type="password"
          onChange={setPassword}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <AuthLinkText>
        <Link to="/signup">註冊</Link>
      </AuthLinkText>
    </AuthContainer>
  );
};

export default LoginPage;
