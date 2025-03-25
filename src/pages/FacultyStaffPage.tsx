"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { Phone, FileText } from "lucide-react"

interface FacultyStaff {
  id: number
  name: string
  nip: string
  position: string
  assignment_letter: string
  whatsapp: string
}

export default function FacultyStaffPage() {
  const [staff, setStaff] = useState<FacultyStaff[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchStaff() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("faculty_staff").select("*").order("name")

        if (error) {
          throw error
        }

        if (data) {
          setStaff(data)
        }
      } catch (error) {
        console.error("Error fetching staff:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStaff()
  }, [])

  const filteredStaff = staff.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.nip.includes(searchQuery),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dosen FSH</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Daftar dosen dan staf Fakultas Syariah dan Hukum beserta informasi kontak.
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Cari dosen berdasarkan nama, NIP, atau jabatan..."
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
          {filteredStaff.length > 0 ? (
            filteredStaff.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-1">{person.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{person.position}</p>
                  <p className="text-gray-600 text-sm mb-4">NIP: {person.nip}</p>

                  <div className="flex flex-col space-y-2">
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

                    {person.assignment_letter && (
                      <a
                        href={person.assignment_letter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Lihat Surat Tugas
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Tidak ada dosen yang ditemukan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

