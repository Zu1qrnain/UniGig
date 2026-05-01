import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROLES } from '../constants/roles'
import ProtectedRoute from './ProtectedRoute'

// Public pages
import LandingPage from '../pages/public/LandingPage'
import LoginPage from '../pages/public/LoginPage'
import RegisterPage from '../pages/public/RegisterPage'
import GigListingPage from '../pages/public/GigListingPage'
import GigDetailPage from '../pages/public/GigDetailPage'

// Client pages
import ClientDashboard from '../pages/client/ClientDashboard'
import MyOrders from '../pages/client/MyOrders'
import ChatPage from '../pages/client/ChatPage'
import LeaveReview from '../pages/client/LeaveReview'

// Freelancer pages
import FreelancerDashboard from '../pages/freelancer/FreelancerDashboard'
import MyGigs from '../pages/freelancer/MyGigs'
import CreateEditGig from '../pages/freelancer/CreateEditGig'

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageGigs from '../pages/admin/ManageGigs'
import ManageOrders from '../pages/admin/ManageOrders'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/gigs' element={<GigListingPage />} />
        <Route path='/gigs/:id' element={<GigDetailPage />} />

        {/* Shared Chat Route — both client and freelancer */}
        <Route path='/chat/:orderId' element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT, ROLES.FREELANCER]}>
            <ChatPage />
          </ProtectedRoute>
        } />

        {/* Client Routes */}
        <Route path='/client/dashboard' element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientDashboard />
          </ProtectedRoute>
        } />

        <Route path='/client/orders' element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <MyOrders />
          </ProtectedRoute>
        } />

        <Route path='/client/chat/:orderId' element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ChatPage />
          </ProtectedRoute>
        } />
        
        <Route path='/client/review/:orderId' element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <LeaveReview />
          </ProtectedRoute>
        } />

        {/* Freelancer Routes */}
        <Route path='/freelancer/dashboard' element={
          <ProtectedRoute allowedRoles={[ROLES.FREELANCER]}>
            <FreelancerDashboard />
          </ProtectedRoute>
        } />


        <Route path='/freelancer/gigs' element={
          <ProtectedRoute allowedRoles={[ROLES.FREELANCER]}>
            <MyGigs />
          </ProtectedRoute>
        } />


        <Route path='/freelancer/gigs/create' element={
          <ProtectedRoute allowedRoles={[ROLES.FREELANCER]}>
            <CreateEditGig />
          </ProtectedRoute>
        } />

        <Route path='/freelancer/gigs/edit/:id' element={
          <ProtectedRoute allowedRoles={[ROLES.FREELANCER]}>
            <CreateEditGig />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />


        <Route path='/admin/users' element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ManageUsers />
          </ProtectedRoute>
        } />


        <Route path='/admin/gigs' element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ManageGigs />
          </ProtectedRoute>
        } />


        <Route path='/admin/orders' element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ManageOrders />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter