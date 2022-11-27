import axios from 'axios'
const authURL = 'https://todo-list.alphacamp.io/api/auth';
export const login = async ({username,password}) => {
  try {
    const {data} = await axios.post(`${authURL}/login`, 
    {
      username,
      password
    })
    console.log(data)
    const {authToken} = data
    // 如果後端驗證成功有回傳JWT token
    if (authToken) {
      return {success: true, ...data}
    }
    return data
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
}

export const register = async ({username,email,password}) => {
  try {
    const {data} = await axios.post (`${authURL}/register`, {
      username,
      email,
      password
    })
    console.log(data)
    const {authToken} = data
    // 如果註冊成功，會回傳token
    if (authToken) {
      return {success: true ,...data }
    }
    return data
  } catch (error) {
    console.error('[Register Failed]: ', error);}
}