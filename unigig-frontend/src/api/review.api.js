import axiosInstance from './axios'
import { API_ENDPOINTS } from '../constants/apiEndpoints'

export const submitReviewAPI = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.REVIEWS.BASE, data)
  return response.data
}

export const getFreelancerReviewsAPI = async (freelancerId) => {
  const response = await axiosInstance.get(API_ENDPOINTS.REVIEWS.BY_FREELANCER(freelancerId))
  return response.data
}