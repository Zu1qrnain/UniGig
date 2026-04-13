import axiosInstance from './axios'
import { API_ENDPOINTS } from '../constants/apiEndpoints'

export const registerAPI = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data)
  return response.data
}

export const loginAPI = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data)
  return response.data
}

export const getMeAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME)
  return response.data
}
