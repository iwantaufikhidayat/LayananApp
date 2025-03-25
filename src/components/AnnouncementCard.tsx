import { Link } from "react-router-dom"
import { formatDate } from "../utils/formatDate"

interface AnnouncementCardProps {
  id: number
  tanggal: string
  judul: string
  deskripsi: string
}

export default function AnnouncementCard({ id, tanggal, judul, deskripsi }: AnnouncementCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="text-sm text-gray-500 mb-2">{formatDate(tanggal)}</div>
      <h3 className="text-lg font-semibold text-green-800 mb-2">{judul}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{deskripsi}</p>
      <Link
        to={`/pengumuman/${id}`}
        className="text-green-600 text-sm font-medium hover:text-green-800 hover:underline"
      >
        Baca Selengkapnya
      </Link>
    </div>
  )
}

