import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Tentang Kami</h3>
            <p className="text-sm text-gray-300 mb-4">
              Layanan Akademik Fakultas Syariah dan Hukum menyediakan berbagai layanan untuk mahasiswa, dosen, dan staf.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-green-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-green-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-green-400">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-gray-300 hover:text-white">
                  Layanan Akademik
                </Link>
              </li>
              <li>
                <Link to="/unduhan" className="text-gray-300 hover:text-white">
                  Unduhan
                </Link>
              </li>
              <li>
                <Link to="/dosen" className="text-gray-300 hover:text-white">
                  Dosen FSH
                </Link>
              </li>
              <li>
                <Link to="/pengumuman" className="text-gray-300 hover:text-white">
                  Pengumuman
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tentang" className="text-gray-300 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-gray-300 hover:text-white">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link to="/syarat-ketentuan" className="text-gray-300 hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link to="/kebijakan-privasi" className="text-gray-300 hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Jl. Ir. H. Juanda No. 95, Ciputat, Tangerang Selatan, Banten 15412
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-gray-300">(021) 7493315</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-gray-300">akademik.fsh@uinjkt.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fakultas Syariah dan Hukum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

