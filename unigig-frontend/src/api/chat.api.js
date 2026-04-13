import axiosInstance from './axios'

export const getChatHistoryAPI = async (orderId) => {
  const response = await axiosInstance.get(`/messages/${orderId}`)
  return response.data
}