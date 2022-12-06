import axios from 'axios'
const authURL = 'https://todo-list.alphacamp.io/api/auth';
export const login = async ({username,password}) => {
  try {
    const {data} = await axios.post(`${authURL}/login`, 
    {
      username,
      password
    })
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
    const {authToken} = data
    // 如果註冊成功，會回傳token
    if (authToken) {
      return {success: true ,...data }
    }
    return data
  } catch (error) {
    console.error('[Register Failed]: ', error);}
}
// 後端驗證token是否還有效
export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`,
    {
      headers: {
      Authorization: 'Bearer ' + authToken,
    }
  })
    return response.data.success
  } catch(error) {
     console.error('[Check Permission Failed]:', error);
     // return something here....
     return 
  }
} 