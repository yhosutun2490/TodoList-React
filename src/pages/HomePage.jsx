// 根據使用者是否登入狀態，導入對應頁面
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  // 每次跳入HomePage時，自動判斷導向
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo')
    }
    else {navigate('/login')}
  },[navigate,isAuthenticated])

  return <div>HomePage</div>
}

export default HomePage
