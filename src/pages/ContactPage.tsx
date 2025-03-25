"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Kontak Kami</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Informasi Kontak</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-800">Alamat</h3>
                <p className="text-gray-600 mt-1">
                  Fakultas Syariah dan Hukum
                  <br />
                  Jl. Ir. H. Juanda No. 95
                  <br />
                  Ciputat, Tangerang Selatan
                  <br />
                  Banten 15412
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-800">Telepon</h3>
                <p className="text-gray-600 mt-1">(021) 7493315</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600 mt-1">akademik.fsh@uinjkt.ac.id</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-800">Jam Operasional</h3>
                <p className="text-gray-600 mt-1">
                  Senin - Kamis: 08.00 - 16.00 WIB
                  <br />
                  Jumat: 08.00 - 16.30 WIB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Kirim Pesan</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subjek
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Pilih Subjek</option>
                <option value="Layanan Akademik">Layanan Akademik</option>
                <option value="Informasi Perkuliahan">Informasi Perkuliahan</option>
                <option value="Pengaduan">Pengaduan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                <p>Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.</p>
              </div>
            )}

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p>{submitError}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

