import axios from 'axios'
const baseUrl = 'https://todo-list.alphacamp.io/api'; // 替換成替換成AC server

// 產生axios 實例來管理API
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// 利用axios 攔截器再發現請求前帶入token
axiosInstance.interceptors.request.use(
  (config) => {
     const token = localStorage.getItem('authToken'); // 取出token
     // 如果有token的話 放入API請求Header中
      if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
  },
  (error) => {console.error(error)}
)

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`)
    return res.data.data
  }
  catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
}
export const createTodo = async (payload) => {
  const {title,isDone} = payload
  try {
    console.log(payload) // 有吃到前端資料
    const res = await axiosInstance.post(`${baseUrl}/todos`, 
    { title,
      isDone
    });
  console.log(res.data)
  return res.data
  } catch (error) {
    console.error('[Create Todo failed]: ', error);
  }
  
}

export const patchTodo = async (payload) => {
  const {id, title, isDone} = payload
  try {
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {title,isDone})
    return res.data
  } catch (error) {console.error('[Patch Todo failed]:', error)}

}
export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`)
    return res.data
  } catch (error) {
    console.error('[Delete Todo failed]:', error);
  }
}

