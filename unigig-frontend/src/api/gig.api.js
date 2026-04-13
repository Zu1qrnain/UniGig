import axiosInstance from './axios'
import { API_ENDPOINTS } from '../constants/apiEndpoints'

export const getAllGigsAPI = async (params) => {
  const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BASE, { params })
  return response.data
}

export const getGigByIdAPI = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.GIGS.BY_ID(id))
  return response.data
}

export const getMyGigsAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.GIGS.MY_GIGS)
  return response.data
}

export const createGigAPI = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.GIGS.BASE, data)
  return response.data
}

export const updateGigAPI = async (id, data) => {
  const response = await axiosInstance.put(API_ENDPOINTS.GIGS.BY_ID(id), data)
  return response.data
}

export const deleteGigAPI = async (id) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.GIGS.BY_ID(id))
  return response.data
}