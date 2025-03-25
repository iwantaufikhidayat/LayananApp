import { Link } from "react-router-dom"

interface ServiceCardProps {
  id: number
  name: string
  url: string
  description: string
  staf: string
  foto: string
}

export default function ServiceCard({ id, name, url, description, staf, foto }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img
          src={foto || "https://via.placeholder.com/400x200?text=Layanan+Akademik"}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "https://via.placeholder.com/400x200?text=Layanan+Akademik"
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
        <p className="text-gray-500 text-xs mb-4">Staf: {staf}</p>
        <Link
          to={url}
          className="inline-block bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Detail Layanan
        </Link>
      </div>
    </div>
  )
}

