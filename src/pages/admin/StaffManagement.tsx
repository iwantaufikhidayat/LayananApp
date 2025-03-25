"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Edit, Trash, Phone, FileText } from "lucide-react"

interface FacultyStaff {
  id: number
  name: string
  nip: string
  position: string
  assignment_letter: string
  whatsapp: string
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<FacultyStaff[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from("faculty_staff").select("*").order("name")

      if (error) throw error

      setStaff(data || [])
    } catch (error: any) {
      console.error("Error fetching staff:", error)
      setError(error.message || "Terjadi kesalahan saat memuat data staf.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStaff = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data staf ini?")) {
      return
    }

    try {
      setError(null)

      const { error } = await supabase.from("faculty_staff").delete().eq("id", id)

      if (error) throw error

      setStaff(staff.filter((person) => person.id !== id))
    } catch (error: any) {
      console.error("Error deleting staff:", error)
      setError(error.message || "Terjadi kesalahan saat menghapus data staf.")
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Manajemen Dosen & Staf">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Manajemen Dosen & Staf">
      <div className="mb-6 flex justify-end">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Tambah Dosen/Staf
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
                Nama
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NIP
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Jabatan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kontak
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
            {staff.length > 0 ? (
              staff.map((person) => (
                <tr key={person.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{person.nip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{person.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.whatsapp && (
                      <a
                        href={`https://wa.me/${person.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 flex items-center text-sm"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {person.whatsapp}
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {person.assignment_letter && (
                        <a
                          href={person.assignment_letter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FileText className="h-5 w-5" />
                        </a>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteStaff(person.id)} className="text-red-600 hover:text-red-900">
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada data dosen/staf yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

