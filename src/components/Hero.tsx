import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <div className="relative bg-green-800 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 opacity-90"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Layanan Akademik Fakultas Syariah dan Hukum
          </h1>
          <p className="text-lg md:text-xl mb-8 text-green-100">
            Menyediakan berbagai layanan akademik untuk mahasiswa, dosen, dan staf dengan cepat, mudah, dan transparan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/layanan"
              className="bg-white text-green-800 px-6 py-3 rounded-md font-medium text-center hover:bg-gray-100 transition-colors"
            >
              Lihat Layanan
            </Link>
            <Link
              to="/kontak"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-center hover:bg-white/10 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

