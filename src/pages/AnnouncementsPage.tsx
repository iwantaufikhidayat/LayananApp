"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import AnnouncementCard from "../components/AnnouncementCard"

interface Announcement {
  id: number
  tanggal: string
  judul: string
  deskripsi: string
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("announcements").select("*").order("tanggal", { ascending: false })

        if (error) {
          throw error
        }

        if (data) {
          setAnnouncements(data)
        }
      } catch (error) {
        console.error("Error fetching announcements:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pengumuman</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Informasi dan pengumuman terbaru dari Fakultas Syariah dan Hukum.
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Cari pengumuman..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                id={announcement.id}
                tanggal={announcement.tanggal}
                judul={announcement.judul}
                deskripsi={announcement.deskripsi}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Tidak ada pengumuman yang ditemukan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

