"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Edit, Trash, Download, FileText, FileImage, FileArchive } from "lucide-react"

interface DownloadFile {
  id: number
  nama_file: string
  deskripsi: string
  download_file: string
  tipe_file: string
  ukuran_file: string
  kategori: string
}

export default function DownloadsManagement() {
  const [files, setFiles] = useState<DownloadFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from("downloads").select("*").order("nama_file")

      if (error) throw error

      setFiles(data || [])
    } catch (error: any) {
      console.error("Error fetching files:", error)
      setError(error.message || "Terjadi kesalahan saat memuat data file.")
    } finally {
      setLoading(false)
    }
  }

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

  const handleDeleteFile = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus file ini?")) {
      return
    }

    try {
      setError(null)

      const { error } = await supabase.from("downloads").delete().eq("id", id)

      if (error) throw error

      setFiles(files.filter((file) => file.id !== id))
    } catch (error: any) {
      console.error("Error deleting file:", error)
      setError(error.message || "Terjadi kesalahan saat menghapus file.")
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Manajemen Unduhan">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Manajemen Unduhan">
      <div className="mb-6 flex justify-end">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Tambah File
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}

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
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.length > 0 ? (
                files.map((file) => (
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
                      <div className="flex justify-end space-x-2">
                        <a
                          href={file.download_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDeleteFile(file.id)} className="text-red-600 hover:text-red-900">
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Tidak ada file yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

