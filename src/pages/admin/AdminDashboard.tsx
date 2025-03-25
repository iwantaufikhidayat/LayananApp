"use client"

import { Link } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import { useAuth } from "../../contexts/AuthContext"
import { Layers, FileText, Users, Bell, Download, Settings } from "lucide-react"

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <AdminLayout title="Dashboard">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Selamat Datang di Panel Admin</h2>
        <p className="text-gray-600">
          Halo, {user?.user_metadata?.full_name || user?.email}. Gunakan panel admin ini untuk mengelola konten website.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/categories" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Layers className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Kategori</h2>
          </div>
          <p className="text-gray-600">Kelola kategori layanan akademik</p>
        </Link>

        <Link to="/admin/services" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Layanan Akademik</h2>
          </div>
          <p className="text-gray-600">Kelola layanan akademik yang tersedia</p>
        </Link>

        <Link to="/admin/downloads" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Unduhan</h2>
          </div>
          <p className="text-gray-600">Kelola dokumen dan file yang dapat diunduh</p>
        </Link>

        <Link to="/admin/staff" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Dosen & Staf</h2>
          </div>
          <p className="text-gray-600">Kelola data dosen dan staf fakultas</p>
        </Link>

        <Link to="/admin/announcements" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <Bell className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Pengumuman</h2>
          </div>
          <p className="text-gray-600">Kelola pengumuman dan informasi penting</p>
        </Link>

        <Link to="/admin/settings" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 p-3 rounded-full mr-4">
              <Settings className="h-6 w-6 text-gray-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Pengaturan</h2>
          </div>
          <p className="text-gray-600">Kelola pengaturan aplikasi dan akun</p>
        </Link>
      </div>
    </AdminLayout>
  )
}

