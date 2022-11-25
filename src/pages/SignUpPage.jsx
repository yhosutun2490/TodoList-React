import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText
} from 'components/common/auth.styled'
import { ACLogoIcon } from 'assets/images'
import { AuthInput } from 'components'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const SignUpPage = () => {
  // 帳號、密碼、email
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput label="帳號" value={userName} placeholder="請輸入帳號" onChange={setUserName}/>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput label="帳號" value={email} placeholder="請輸入email" onChange={setEmail} type="email"/>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput  label="密碼" value={password} placeholder="請輸入密碼" onChange={setPassword} type="password"/>
      </AuthInputContainer>
      <AuthButton>註冊</AuthButton>
      <Link  to="/login">
       <AuthLinkText>取消</AuthLinkText>
      </Link>
      
    </AuthContainer>
  )
}

export default SignUpPage
