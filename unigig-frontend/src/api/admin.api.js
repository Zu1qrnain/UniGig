import axiosInstance from './axios'
import { API_ENDPOINTS } from '../constants/apiEndpoints'

export const getStatsAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.STATS)
  return response.data
}

export const getAllUsersAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS)
  return response.data
}

export const banUserAPI = async (id) => {
  const response = await axiosInstance.put(API_ENDPOINTS.ADMIN.BAN_USER(id))
  return response.data
}

export const deleteUserAPI = async (id) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.ADMIN.DELETE_USER(id))
  return response.data
}

export const getAdminGigsAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.GIGS)
  return response.data
}

export const deleteAdminGigAPI = async (id) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.ADMIN.DELETE_GIG(id))
  return response.data
}

export const getAdminOrdersAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.ORDERS)
  return response.data
}

export const getReportsAPI = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.REPORTS)
  return response.data
}

export const updateReportStatusAPI = async (id, status) => {
  const response = await axiosInstance.put(API_ENDPOINTS.ADMIN.UPDATE_REPORT(id), { status })
  return response.data
}