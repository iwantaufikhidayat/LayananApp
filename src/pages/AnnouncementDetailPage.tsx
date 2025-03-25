"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { ArrowLeft } from "lucide-react"
import { formatDate } from "../utils/formatDate"

interface Announcement {
  id: number
  tanggal: string
  judul: string
  deskripsi: string
}

export default function AnnouncementDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnnouncementDetail() {
      try {
        setLoading(true)
        setError(null)

        if (!id) {
          throw new Error("Announcement ID not found")
        }

        const { data, error } = await supabase.from("announcements").select("*").eq("id", id).single()

        if (error) {
          throw error
        }

        if (data) {
          setAnnouncement(data)
        } else {
          throw new Error("Announcement not found")
        }
      } catch (error) {
        console.error("Error fetching announcement details:", error)
        setError("Pengumuman tidak ditemukan atau terjadi kesalahan saat memuat data.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncementDetail()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <Link to="/pengumuman" className="text-green-600 hover:text-green-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Pengumuman
          </Link>
        </div>
      </div>
    )
  }

  if (!announcement) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          <p>Pengumuman tidak ditemukan.</p>
        </div>
        <div className="mt-4">
          <Link to="/pengumuman" className="text-green-600 hover:text-green-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Pengumuman
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/pengumuman" className="text-green-600 hover:text-green-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Pengumuman
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">{formatDate(announcement.tanggal)}</div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">{announcement.judul}</h1>

          <div className="prose max-w-none text-gray-600 whitespace-pre-line">{announcement.deskripsi}</div>
        </div>
      </div>
    </div>
  )
}

