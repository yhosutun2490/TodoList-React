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
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const SignUpPage = () => {
  // 帳號、密碼、email
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { isAuthenticated ,register} = useAuth()

  async function handleClick() {
    // 如果輸入框有其中一個為空值不做事
    if (userName.length ===0 || email.length===0 || password.length===0) {
      return
    }
    const success = await register (
      {
        username:userName,
        email:email,
        password:password
      }
    ) 
    if (success) {
        // 成功註冊跳出視窗
        Swal.fire({
          position: 'top',
          title: '註冊成功！',
          timer: 2500,
          icon: 'success',
          showConfirmButton: false,
          showCancelButton: false
          })
          return 
    }
    Swal.fire({
      position: 'top',
      title: '註冊失敗！ 可能帳密已經被註冊或格式錯誤',
      timer: 2500,
      icon: 'error',
      showConfirmButton: false,
      showCancelButton: false
    });
  }
  useEffect(() => {
      if (isAuthenticated) {
        navigate('/todo');
      }
    }, [navigate,isAuthenticated]
    );
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
        <AuthInput label="信箱" value={email} placeholder="請輸入email" onChange={setEmail} type="email"/>
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput  label="密碼" value={password} placeholder="請輸入密碼" onChange={setPassword} type="password"/>
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link  to="/login">
       <AuthLinkText>取消</AuthLinkText>
      </Link>
      
    </AuthContainer>
  )
}

export default SignUpPage
