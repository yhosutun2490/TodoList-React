import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText
} from 'components/common/auth.styled'
import { ACLogoIcon } from 'assets/images'
import { AuthInput } from 'components'
import { useState } from 'react'
import { login } from 'api/auth'
import Swal from 'sweetalert2'

const LoginPage = () => {
  // login page資料狀態
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  
  async function handleClick () {
    // 登入輸入框有一個沒填不做事
    if (username.length===0 || password.length === 0) {
      return
    }
    const {success , authToken} = await login({username,password})
    // 登入驗證成功 success = true
    if (success) {
      localStorage.setItem('authToken', authToken);
      // 登入成功視窗
      Swal.fire({
        title: '登入成功!',
        icon: 'success',
        timer: 2500,
        position: 'top',
        showCloseButton: false,
        showConfirmButton: false,
      })
    }
    // 登入失敗跳窗
    Swal.fire({
        title: '登入失敗!',
        icon: 'error',
        timer: 2500,
        position: 'top',
        showCloseButton: false,
        showConfirmButton: false,
      })


  }
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput label="姓名" value={username} placeholder="請輸入大名" onChange={setName}/>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput label="密碼" value={password} placeholder="請輸入密碼" type="password" onChange={setPassword}/>
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <AuthLinkText>註冊</AuthLinkText>
    </AuthContainer>
  )
}

export default LoginPage
