import Hero from "../components/Hero"
import FeaturedServices from "../components/FeaturedServices"
import LatestAnnouncements from "../components/LatestAnnouncements"

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedServices />
      <LatestAnnouncements />

      <div className="container mx-auto px-4 py-12">
        <div className="bg-green-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Butuh Bantuan?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Jika Anda memiliki pertanyaan atau membutuhkan bantuan terkait layanan akademik, jangan ragu untuk
            menghubungi kami.
          </p>
          <a
            href="/kontak"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  )
}

