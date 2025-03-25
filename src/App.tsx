import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import MainLayout from "./components/MainLayout"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import ServiceDetailPage from "./pages/ServiceDetailPage"
import DownloadsPage from "./pages/DownloadsPage"
import FacultyStaffPage from "./pages/FacultyStaffPage"
import AnnouncementsPage from "./pages/AnnouncementsPage"
import AnnouncementDetailPage from "./pages/AnnouncementDetailPage"
import AccountPage from "./pages/AccountPage"
import SearchPage from "./pages/SearchPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import TermsPage from "./pages/TermsPage"
import PrivacyPage from "./pages/PrivacyPage"
import FaqPage from "./pages/FaqPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard"
import CategoriesManagement from "./pages/admin/CategoriesManagement"
import ServicesManagement from "./pages/admin/ServicesManagement"
import ServiceForm from "./pages/admin/ServiceForm"
import DownloadsManagement from "./pages/admin/DownloadsManagement"
import AnnouncementsManagement from "./pages/admin/AnnouncementsManagement"
import StaffManagement from "./pages/admin/StaffManagement"
import SettingsPage from "./pages/admin/SettingsPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requireAdmin>
                <CategoriesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute requireAdmin>
                <ServicesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/add"
            element={
              <ProtectedRoute requireAdmin>
                <ServiceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/edit/:id"
            element={
              <ProtectedRoute requireAdmin>
                <ServiceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/downloads"
            element={
              <ProtectedRoute requireAdmin>
                <DownloadsManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <ProtectedRoute requireAdmin>
                <AnnouncementsManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <ProtectedRoute requireAdmin>
                <StaffManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requireAdmin>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Public routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/layanan"
            element={
              <MainLayout>
                <ServicesPage />
              </MainLayout>
            }
          />
          <Route
            path="/layanan/:id"
            element={
              <MainLayout>
                <ServiceDetailPage />
              </MainLayout>
            }
          />
          <Route
            path="/unduhan"
            element={
              <MainLayout>
                <DownloadsPage />
              </MainLayout>
            }
          />
          <Route
            path="/dosen"
            element={
              <MainLayout>
                <FacultyStaffPage />
              </MainLayout>
            }
          />
          <Route
            path="/pengumuman"
            element={
              <MainLayout>
                <AnnouncementsPage />
              </MainLayout>
            }
          />
          <Route
            path="/pengumuman/:id"
            element={
              <MainLayout>
                <AnnouncementDetailPage />
              </MainLayout>
            }
          />
          <Route
            path="/search"
            element={
              <MainLayout>
                <SearchPage />
              </MainLayout>
            }
          />
          <Route
            path="/tentang"
            element={
              <MainLayout>
                <AboutPage />
              </MainLayout>
            }
          />
          <Route
            path="/kontak"
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            }
          />
          <Route
            path="/syarat-ketentuan"
            element={
              <MainLayout>
                <TermsPage />
              </MainLayout>
            }
          />
          <Route
            path="/kebijakan-privasi"
            element={
              <MainLayout>
                <PrivacyPage />
              </MainLayout>
            }
          />
          <Route
            path="/faq"
            element={
              <MainLayout>
                <FaqPage />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              <MainLayout>
                <LoginPage />
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout>
                <RegisterPage />
              </MainLayout>
            }
          />
          <Route
            path="/akun"
            element={
              <MainLayout>
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

