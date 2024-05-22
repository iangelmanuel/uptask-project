import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppLayout from './layout/AppLayout'
import DashboardPage from './pages/DashboardPage'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
