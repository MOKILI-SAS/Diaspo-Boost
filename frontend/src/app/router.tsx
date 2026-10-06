import { Navigate, createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '../features/layout/SiteLayout'
import { AdminPage } from '../pages/AdminPage'
import { BilanReaderPage } from '../pages/BilanReaderPage'
import { BilansPage } from '../pages/BilansPage'
import { BookingConfirmationPage } from '../pages/BookingConfirmationPage'
import { HomePage } from '../pages/HomePage'
import { LancerPage } from '../pages/LancerPage'
import { MembresPage } from '../pages/MembresPage'
import { NewsDetailPage } from '../pages/NewsDetailPage'
import { PressePage } from '../pages/PressePage'
import { RdvConfirmationPage } from '../pages/RdvConfirmationPage'
import { RdvPage } from '../pages/RdvPage'
import { ServiceDetailPage } from '../pages/ServiceDetailPage'
import { ServicesPage } from '../pages/ServicesPage'
import {
  EquipeContactPage,
  FaqPage,
  InvestirPage,
  LegalPage,
  NotFoundPage,
  ParticiperPage,
  PrivacyPage,
  SommetsPage,
} from '../pages/StaticPages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'lancer', element: <LancerPage /> },
      { path: 'demarche', element: <Navigate to="/lancer" replace /> },
      { path: 'admin', element: <AdminPage /> },
      { path: 'mission', element: <Navigate to="/#mission" replace /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      { path: 'service', element: <Navigate to="/services" replace /> },
      { path: 'investir', element: <InvestirPage /> },
      { path: 'participer', element: <ParticiperPage /> },
      { path: 'sommets', element: <SommetsPage /> },
      { path: 'bilans', element: <BilansPage /> },
      { path: 'bilans/:slug', element: <BilanReaderPage /> },
      { path: 'membres', element: <MembresPage /> },
      { path: 'rdv', element: <RdvPage /> },
      { path: 'rdv/confirmation/:reference', element: <RdvConfirmationPage /> },
      { path: 'presse', element: <PressePage /> },
      { path: 'equipe-contact', element: <EquipeContactPage /> },
      { path: 'actualites', element: <Navigate to="/equipe-contact" replace /> },
      { path: 'actualites/:slug', element: <NewsDetailPage /> },
      { path: 'gouvernance', element: <Navigate to="/equipe-contact" replace /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'contact', element: <Navigate to="/equipe-contact" replace /> },
      { path: 'booking/confirmation/:reference', element: <BookingConfirmationPage /> },
      { path: 'mentions-legales', element: <LegalPage /> },
      { path: 'confidentialite', element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
