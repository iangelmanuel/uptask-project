import AppLayout from '@/layout/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import CreateProjectPage from '@/pages/projects/CreateProjectPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import EditProjectView from './pages/projects/EditProjectPage'
import ProjectDetailsPage from './pages/projects/ProjectDetailsPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
