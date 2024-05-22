import AppLayout from '@/layout/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import CreateProjectPage from '@/pages/projects/CreateProjectPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
