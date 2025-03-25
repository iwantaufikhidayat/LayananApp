"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import AnnouncementCard from "./AnnouncementCard"

interface Announcement {
  id: number
  tanggal: string
  judul: string
  deskripsi: string
}

export default function LatestAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("announcements")
          .select("*")
          .order("tanggal", { ascending: false })
          .limit(3)

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Pengumuman Terbaru</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Pengumuman Terbaru</h2>
          <Link to="/pengumuman" className="text-green-600 font-medium hover:text-green-800 hover:underline">
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
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
              <p className="text-gray-500">Belum ada pengumuman yang tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

