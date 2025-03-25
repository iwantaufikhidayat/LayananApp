"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { ArrowLeft } from "lucide-react"

interface Service {
  id: number
  name: string
  url: string
  description: string
  category_id: number
  staf: string
  foto: string
}

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServiceDetail() {
      try {
        setLoading(true)
        setError(null)

        // Extract the service ID from the URL if needed
        const serviceId = id?.split("-").pop()

        if (!serviceId) {
          throw new Error("Service ID not found")
        }

        const { data, error } = await supabase.from("academic_services").select("*").eq("id", serviceId).single()

        if (error) {
          throw error
        }

        if (data) {
          setService(data)
        } else {
          throw new Error("Service not found")
        }
      } catch (error) {
        console.error("Error fetching service details:", error)
        setError("Layanan tidak ditemukan atau terjadi kesalahan saat memuat data.")
      } finally {
        setLoading(false)
      }
    }

    fetchServiceDetail()
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
          <Link to="/layanan" className="text-green-600 hover:text-green-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Layanan
          </Link>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          <p>Layanan tidak ditemukan.</p>
        </div>
        <div className="mt-4">
          <Link to="/layanan" className="text-green-600 hover:text-green-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Layanan
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/layanan" className="text-green-600 hover:text-green-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Layanan
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-64 md:h-80 overflow-hidden">
          <img
            src={service.foto || "https://via.placeholder.com/1200x600?text=Layanan+Akademik"}
            alt={service.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "https://via.placeholder.com/1200x600?text=Layanan+Akademik"
            }}
          />
        </div>

        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">{service.name}</h1>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Deskripsi Layanan</h2>
            <p className="text-gray-600 whitespace-pre-line">{service.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Staf Penanggung Jawab</h2>
            <p className="text-gray-600">{service.staf}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Cara Mengakses Layanan</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>Datang ke kantor Fakultas Syariah dan Hukum pada jam kerja (08.00 - 16.00 WIB)</li>
              <li>Bawa persyaratan yang diperlukan sesuai dengan jenis layanan</li>
              <li>Isi formulir yang disediakan oleh petugas</li>
              <li>Tunggu proses layanan sesuai dengan estimasi waktu yang diberikan</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

