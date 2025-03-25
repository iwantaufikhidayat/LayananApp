"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Search, Home, FileText, Users, Bell, User, Settings } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, isAdmin } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-green-700 text-white" : "text-white hover:bg-green-700"
  }

  return (
    <nav className="bg-green-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/")}`}>
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </div>
            </Link>
            <Link to="/layanan" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/layanan")}`}>
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-1" />
                <span>Layanan</span>
              </div>
            </Link>
            <Link to="/search" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/search")}`}>
              <div className="flex items-center">
                <Search className="h-5 w-5 mr-1" />
                <span>Search</span>
              </div>
            </Link>
            <Link to="/unduhan" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/unduhan")}`}>
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-1" />
                <span>Unduhan</span>
              </div>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dosen" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/dosen")}`}>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-1" />
                <span>Dosen</span>
              </div>
            </Link>
            <Link to="/pengumuman" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/pengumuman")}`}>
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-1" />
                <span>Pengumuman</span>
              </div>
            </Link>
            <Link to="/akun" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/akun")}`}>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>Akun</span>
              </div>
            </Link>
            {isAdmin && (
              <Link to="/admin" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/admin")}`}>
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-1" />
                  <span>Admin</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                <span>Home</span>
              </div>
            </Link>
            <Link
              to="/layanan"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                <span>Layanan</span>
              </div>
            </Link>
            <Link
              to="/search"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
              </div>
            </Link>
            <Link
              to="/unduhan"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                <span>Unduhan</span>
              </div>
            </Link>
            <Link
              to="/dosen"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Dosen</span>
              </div>
            </Link>
            <Link
              to="/pengumuman"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                <span>Pengumuman</span>
              </div>
            </Link>
            <Link
              to="/akun"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>Akun</span>
              </div>
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Admin</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

