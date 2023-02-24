import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import BASE_URL from '../constants/baseURL'
import { httpRes } from '../types/httpRes'
import Token from '../utils/token'
const { getToken } = Token
class WRequest {
  private instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      withCredentials: true
    })
  }
  request<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return new Promise<any>((resolve, reject) => {
      this.instance.interceptors.request.use(
        (config) => {
          const token = getToken()
          if (token) config.headers.Authorization = `Bearer ${token}`
          return config
        },
        (err) => {
          console.error(err)
          return err
        }
      )
      this.instance
        .request(config)
        .then((res: AxiosResponse<httpRes<T>>) => {
          if (res.data.success === true) {
            resolve(res.data)
          } else {
            if (res.data.msg !== null && res.data.msg !== undefined)
              alert(res.data.msg)
            throw new Error(res.data.msg)
          }
        })
        .catch((err: AxiosError) => {
          console.error(err)
          resolve({
            data: null,
            status: 400,
            msg: err.message || '出错',
            success: false
          })
        })
        .finally(() => {
          // console.log(`end of request`)
        })
    })
  }
  get<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return this.request({ ...config, method: 'POST' })
  }
  patch<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return this.request({ ...config, method: 'PATCH' })
  }
  delete<T>(config: AxiosRequestConfig): Promise<httpRes<T>> {
    return this.request({ ...config, method: 'DELETE' })
  }
}
const wRequest = new WRequest()
export default wRequest
export * from './article'
export * from './login'
export * from './tag'
export * from './file'
