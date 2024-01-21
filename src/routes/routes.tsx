// src/routes/index.tsx
import { type FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '../components/organisms/Layout/Layout'
import { DetailsPage } from '../pages/DetailsPage/DetailsPage'
import { HomePage } from '../pages/HomePage/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'

export const AppRoutes: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/:id" element={<Layout><DetailsPage /></Layout>} />
      <Route path="/*" element={<Layout><NotFoundPage /></Layout>} />
    </Routes>
  </BrowserRouter>
)
