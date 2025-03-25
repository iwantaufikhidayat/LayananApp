"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Edit, Trash, Eye } from "lucide-react"
import { formatDate } from "../../utils/formatDate"

interface Announcement {
  id: number
  tanggal: string
  judul: string
  deskripsi: string
}

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from("announcements").select("*").order("tanggal", { ascending: false })

      if (error) throw error

      setAnnouncements(data || [])
    } catch (error: any) {
      console.error("Error fetching announcements:", error)
      setError(error.message || "Terjadi kesalahan saat memuat data pengumuman.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAnnouncement = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      return
    }

    try {
      setError(null)

      const { error } = await supabase.from("announcements").delete().eq("id", id)

      if (error) throw error

      setAnnouncements(announcements.filter((announcement) => announcement.id !== id))
    } catch (error: any) {
      console.error("Error deleting announcement:", error)
      setError(error.message || "Terjadi kesalahan saat menghapus pengumuman.")
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Manajemen Pengumuman">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Manajemen Pengumuman">
      <div className="mb-6 flex justify-end">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Tambah Pengumuman
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tanggal
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Judul
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Deskripsi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(announcement.tanggal)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{announcement.judul}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">{announcement.deskripsi}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <a
                        href={`/pengumuman/${announcement.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-900"
                      >
                        <Eye className="h-5 w-5" />
                      </a>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada pengumuman yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

