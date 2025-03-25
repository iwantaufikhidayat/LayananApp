"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import AdminLayout from "../../components/AdminLayout"
import { Save } from "lucide-react"

interface Category {
  id: number
  name: string
}

export default function ServiceForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    category_id: "",
    staf: "",
    foto: "",
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
    if (isEditing) {
      fetchService()
    }
  }, [isEditing, id])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("id, name").order("name")

      if (error) throw error

      setCategories(data || [])
    } catch (error: any) {
      console.error("Error fetching categories:", error)
      setError("Terjadi kesalahan saat memuat data kategori.")
    }
  }

  const fetchService = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from("academic_services").select("*").eq("id", id).single()

      if (error) throw error

      if (data) {
        setFormData({
          name: data.name,
          url: data.url,
          description: data.description,
          category_id: data.category_id.toString(),
          staf: data.staf,
          foto: data.foto,
        })
      }
    } catch (error: any) {
      console.error("Error fetching service:", error)
      setError("Terjadi kesalahan saat memuat data layanan.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.category_id) {
      setError("Nama, deskripsi, dan kategori harus diisi.")
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      const serviceData = {
        ...formData,
        category_id: Number.parseInt(formData.category_id),
        url: formData.url || `/layanan/${formData.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      }

      if (isEditing) {
        const { error } = await supabase.from("academic_services").update(serviceData).eq("id", id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("academic_services").insert([serviceData])

        if (error) throw error
      }

      navigate("/admin/services")
    } catch (error: any) {
      console.error("Error saving service:", error)
      setError(error.message || "Terjadi kesalahan saat menyimpan data layanan.")
    } finally {
      setSubmitting(false)
    }
  }

  const title = isEditing ? "Edit Layanan" : "Tambah Layanan Baru"

  if (loading) {
    return (
      <AdminLayout title={title}>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={title}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Layanan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="staf" className="block text-sm font-medium text-gray-700 mb-1">
              Staf Penanggung Jawab
            </label>
            <input
              type="text"
              id="staf"
              name="staf"
              value={formData.staf}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-1">
              URL Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Masukkan URL gambar untuk layanan ini. Jika kosong, gambar default akan digunakan.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

