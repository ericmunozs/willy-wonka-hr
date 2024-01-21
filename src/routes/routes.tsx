import { Suspense, lazy, type FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '../components/organisms/Layout/Layout'
import { DetailsPage } from '../pages/DetailsPage/DetailsPage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'

const HomePage = lazy(async () => {
  const module = await import('../pages/HomePage/HomePage')
  return { default: module.HomePage }
})

export const AppRoutes: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense></Layout>} />
      <Route path="/:id" element={<Layout><DetailsPage /></Layout>} />
      <Route path="/*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  </BrowserRouter>
)
