export const API_ENDPOINTS = {
    // Auth
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      ME: '/auth/me'
    },
  
    // Gigs
    GIGS: {
      BASE: '/gigs',
      BY_ID: (id) => `/gigs/${id}`,
      MY_GIGS: '/gigs/freelancer/my-gigs'
    },
  
    // Orders
    ORDERS: {
      BASE: '/orders',
      BY_ID: (id) => `/orders/${id}`,
      STATUS: (id) => `/orders/${id}/status`,
      MY_ORDERS: '/orders/my-orders'
    },
  
    // Reviews
    REVIEWS: {
      BASE: '/reviews',
      BY_FREELANCER: (id) => `/reviews/freelancer/${id}`
    },
  
    // Admin
    ADMIN: {
      STATS: '/admin/stats',
      USERS: '/admin/users',
      BAN_USER: (id) => `/admin/users/${id}/ban`,
      DELETE_USER: (id) => `/admin/users/${id}`,
      GIGS: '/admin/gigs',
      DELETE_GIG: (id) => `/admin/gigs/${id}`,
      ORDERS: '/admin/orders',
      REPORTS: '/admin/reports',
      UPDATE_REPORT: (id) => `/admin/reports/${id}`
    }
  }