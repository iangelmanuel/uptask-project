import AppLayout from '@/layout/AppLayout'
import AuthLayout from '@/layout/AuthLayout'
import ProfileLayout from '@/layout/ProfileLayout'
import DashboardPage from '@/pages/DashboardPage'
import ConfirmAccountPage from '@/pages/auth/ConfirmAccountPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import LoginPage from '@/pages/auth/LoginPage'
import NewPasswordPage from '@/pages/auth/NewPasswordPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import RequestNewCodePage from '@/pages/auth/RequestNewCodePage'
import ChangePassPage from '@/pages/profile/ChangePassPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import CreateProjectPage from '@/pages/projects/CreateProjectPage'
import EditProjectPage from '@/pages/projects/EditProjectPage'
import ProjectDetailsPage from '@/pages/projects/ProjectDetailsPage'
import ProjectTeamPage from '@/pages/projects/ProjectTeamPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NotFound from './pages/404/NotFound'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectPage />}
          />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailsPage />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamPage />}
          />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/password" element={<ChangePassPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountPage />}
          />
          <Route
            path="/auth/request-code"
            element={<RequestNewCodePage />}
          />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/auth/new-password" element={<NewPasswordPage />} />

          <Route element={<AuthLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
