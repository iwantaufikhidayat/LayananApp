"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { Download, FileText, FileImage, FileArchive } from "lucide-react"

interface DownloadFile {
  id: number
  nama_file: string
  deskripsi: string
  download_file: string
  tipe_file: string
  ukuran_file: string
  kategori: string
}

export default function DownloadsPage() {
  const [files, setFiles] = useState<DownloadFile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    async function fetchFiles() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("downloads").select("*").order("nama_file")

        if (error) {
          throw error
        }

        if (data) {
          setFiles(data)

          // Extract unique categories
          const uniqueCategories = Array.from(new Set(data.map((file) => file.kategori)))
          setCategories(uniqueCategories)
        }
      } catch (error) {
        console.error("Error fetching files:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase()
    if (type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />
    } else if (type.includes("doc") || type.includes("word")) {
      return <FileText className="h-5 w-5 text-blue-500" />
    } else if (type.includes("xls") || type.includes("excel")) {
      return <FileText className="h-5 w-5 text-green-500" />
    } else if (type.includes("jpg") || type.includes("png") || type.includes("image")) {
      return <FileImage className="h-5 w-5 text-purple-500" />
    } else if (type.includes("zip") || type.includes("rar")) {
      return <FileArchive className="h-5 w-5 text-yellow-500" />
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.nama_file.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? file.kategori === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Unduhan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dokumen dan formulir akademik yang dapat diunduh untuk keperluan mahasiswa, dosen, dan staf.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Cari dokumen..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3">
          <select
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama File
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deskripsi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipe
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ukuran
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Unduh
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getFileIcon(file.tipe_file)}
                          <span className="ml-2 text-sm font-medium text-gray-900">{file.nama_file}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 line-clamp-2">{file.deskripsi}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{file.tipe_file}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{file.ukuran_file}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {file.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={file.download_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Unduh
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      Tidak ada dokumen yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

