import { ROLES } from '../constants/roles'

export const isClient = (user) => user?.role === ROLES.CLIENT

export const isFreelancer = (user) => user?.role === ROLES.FREELANCER

export const isAdmin = (user) => user?.role === ROLES.ADMIN

export const getDashboardPath = (role) => {
  switch (role) {
    case ROLES.CLIENT:
      return '/client/dashboard'
    case ROLES.FREELANCER:
      return '/freelancer/dashboard'
    case ROLES.ADMIN:
      return '/admin/dashboard'
    default:
      return '/'
  }
}