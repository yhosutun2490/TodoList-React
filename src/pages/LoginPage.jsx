import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText
} from 'components/common/auth.styled'
import { ACLogoIcon } from 'assets/images'
import { AuthInput } from 'components'
import { useState } from 'react'

const LoginPage = () => {
  // login page資料狀態
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput label="姓名" value={name} placeholder="請輸入大名" onChange={setName}/>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput label="密碼" value={password} placeholder="請輸入密碼" type="password" onChange={setPassword}/>
      </AuthInputContainer>
      <AuthButton>登入</AuthButton>
      <AuthLinkText>註冊</AuthLinkText>
    </AuthContainer>
  )
}

export default LoginPage
