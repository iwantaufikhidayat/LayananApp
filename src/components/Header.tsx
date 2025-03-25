"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search } from "lucide-react"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="/logo-fsh.png"
                alt="Logo FSH"
                className="h-12 mr-3"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "https://via.placeholder.com/120x48?text=Logo+FSH"
                }}
              />
              <div>
                <h1 className="text-xl font-bold text-green-800">Layanan Akademik</h1>
                <p className="text-sm text-gray-600">Fakultas Syariah dan Hukum</p>
              </div>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari layanan akademik..."
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-600 hover:text-green-800"
              >
                Cari
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}

