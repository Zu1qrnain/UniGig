import axiosInstance from './axios'
import { API_ENDPOINTS } from '../constants/apiEndpoints'

export const placeOrderAPI = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ORDERS.BASE, data)
  return response.data
}

export const getMyOrdersAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ORDERS.MY_ORDERS)
  return response.data
}

export const getOrderByIdAPI = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.ORDERS.BY_ID(id))
  return response.data
}

export const updateOrderStatusAPI = async (id, status) => {
  const response = await axiosInstance.put(API_ENDPOINTS.ORDERS.STATUS(id), { status })
  return response.data
}