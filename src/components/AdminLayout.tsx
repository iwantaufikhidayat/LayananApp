"use client"

import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Layers, FileText, Users, Bell, Download, Settings, LogOut } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

interface AdminLayoutProps {
  children: ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation()
  const { signOut } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
      ? "bg-green-700 text-white"
      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4 mb-5">
              <h1 className="text-xl font-bold text-green-800">Admin Panel</h1>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                <Link
                  to="/admin"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive("/admin")}`}
                >
                  <Home className="mr-3 flex-shrink-0 h-6 w-6" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/categories"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive("/admin/categories")}`}
                >
                  <Layers className="mr-3 flex-shrink-0 h-6 w-6" />
                  Kategori
                </Link>
                <Link
                  to="/admin/services"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive("/admin/services")}`}
                >
                  <FileText className="mr-3 flex-shrink-0 h-6 w-6" />
                  Layanan Akademik
                </Link>
                <Link
                  to="/admin/downloads"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive("/admin/downloads")}`}
                >
                  <Download className="mr-3 flex-shrink-0 h-6 w-6" />
                  Unduhan
                </Link>
                <Link
                  to="/admin/staff"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive("/admin/staff")}`}
                >
                  <Users className="mr-3 flex-shrink-0 h-6 w-6" />
                  Dosen & Staf
                </Link>
                <Link
                  to="/admin/announcements"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive("/admin/announcements")}`}
                >
                  <Bell className="mr-3 flex-shrink-0 h-6 w-6" />
                  Pengumuman
                </Link>
                <Link
                  to="/admin/settings"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive("/admin/settings")}`}
                >
                  <Settings className="mr-3 flex-shrink-0 h-6 w-6" />
                  Pengaturan
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-3 flex-shrink-0 h-6 w-6" />
                  Keluar
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

