"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { Search } from "lucide-react"

interface SearchResult {
  type: "service" | "download" | "announcement"
  id: number
  title: string
  description: string
  url: string
}

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return

    setLoading(true)
    try {
      // Search in academic services
      const { data: servicesData, error: servicesError } = await supabase
        .from("academic_services")
        .select("id, name, description, url")
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)

      if (servicesError) throw servicesError

      // Search in downloads
      const { data: downloadsData, error: downloadsError } = await supabase
        .from("downloads")
        .select("id, nama_file, deskripsi")
        .or(`nama_file.ilike.%${searchTerm}%,deskripsi.ilike.%${searchTerm}%`)

      if (downloadsError) throw downloadsError

      // Search in announcements
      const { data: announcementsData, error: announcementsError } = await supabase
        .from("announcements")
        .select("id, judul, deskripsi")
        .or(`judul.ilike.%${searchTerm}%,deskripsi.ilike.%${searchTerm}%`)

      if (announcementsError) throw announcementsError

      // Format results
      const formattedResults: SearchResult[] = [
        ...(servicesData || []).map((service: any) => ({
          type: "service" as const,
          id: service.id,
          title: service.name,
          description: service.description,
          url: service.url,
        })),
        ...(downloadsData || []).map((download: any) => ({
          type: "download" as const,
          id: download.id,
          title: download.nama_file,
          description: download.deskripsi,
          url: `/unduhan#file-${download.id}`,
        })),
        ...(announcementsData || []).map((announcement: any) => ({
          type: "announcement" as const,
          id: announcement.id,
          title: announcement.judul,
          description: announcement.deskripsi,
          url: `/pengumuman/${announcement.id}`,
        })),
      ]

      setResults(formattedResults)
    } catch (error) {
      console.error("Error performing search:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    }
  }

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case "service":
        return "Layanan Akademik"
      case "download":
        return "Dokumen"
      case "announcement":
        return "Pengumuman"
      default:
        return "Hasil"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pencarian</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Cari layanan akademik, dokumen, dan pengumuman.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {query && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Hasil pencarian untuk: <span className="text-green-600">"{query}"</span>
              </h2>
              <p className="text-gray-600 mt-1">{results.length} hasil ditemukan</p>
            </div>
          )}

          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((result, index) => (
                <div
                  key={`${result.type}-${result.id}-${index}`}
                  className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {getResultTypeLabel(result.type)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">{result.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{result.description}</p>
                  <Link
                    to={result.url}
                    className="text-green-600 text-sm font-medium hover:text-green-800 hover:underline"
                  >
                    Lihat Detail
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            query && (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada hasil yang ditemukan untuk "{query}".</p>
                <p className="text-gray-500 mt-2">Coba kata kunci lain atau periksa ejaan Anda.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

