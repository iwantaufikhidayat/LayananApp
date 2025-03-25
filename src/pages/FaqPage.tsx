"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems: FaqItem[] = [
    {
      question: "Bagaimana cara mengajukan permohonan pengambilan ijazah?",
      answer:
        "Untuk mengajukan permohonan pengambilan ijazah, Anda perlu datang ke kantor Fakultas Syariah dan Hukum dengan membawa persyaratan berikut: KTP asli, fotokopi KTP, surat keterangan lulus asli, dan bukti pembayaran biaya wisuda. Setelah itu, Anda akan diminta untuk mengisi formulir pengambilan ijazah dan menunggu proses verifikasi.",
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk proses legalisir dokumen?",
      answer:
        "Proses legalisir dokumen membutuhkan waktu sekitar 2-3 hari kerja. Namun, waktu ini dapat bervariasi tergantung pada jumlah permintaan yang sedang diproses. Anda akan diberitahu melalui email atau SMS ketika dokumen Anda siap untuk diambil.",
    },
    {
      question: "Apakah saya bisa mengajukan permohonan transkrip nilai secara online?",
      answer:
        "Ya, Anda dapat mengajukan permohonan transkrip nilai secara online melalui website ini. Caranya adalah dengan login ke akun Anda, pilih menu 'Layanan', kemudian pilih 'Permohonan Transkrip Nilai'. Isi formulir yang disediakan dan unggah dokumen yang diperlukan. Setelah permohonan Anda diverifikasi, Anda akan diberitahu kapan transkrip nilai Anda siap untuk diambil.",
    },
    {
      question: "Bagaimana cara mengajukan cuti akademik?",
      answer:
        "Untuk mengajukan cuti akademik, Anda perlu mengisi formulir permohonan cuti yang dapat diunduh di halaman Unduhan. Setelah formulir diisi lengkap dan ditandatangani, Anda perlu menyerahkannya ke kantor Fakultas Syariah dan Hukum beserta dokumen pendukung seperti surat keterangan dari dokter (jika cuti karena alasan kesehatan) atau dokumen lain yang relevan. Permohonan cuti akan diproses dalam waktu 5-7 hari kerja.",
    },
    {
      question: "Apa saja persyaratan untuk mengajukan permohonan pindah jurusan?",
      answer:
        "Persyaratan untuk mengajukan permohonan pindah jurusan antara lain: telah menyelesaikan minimal 2 semester, memiliki IPK minimal 3.00, surat persetujuan dari orang tua/wali, surat rekomendasi dari Ketua Jurusan asal, dan formulir permohonan pindah jurusan yang telah diisi lengkap. Permohonan pindah jurusan hanya dapat diajukan pada awal semester dan akan dipertimbangkan berdasarkan ketersediaan kuota pada jurusan yang dituju.",
    },
    {
      question: "Bagaimana cara mengajukan permohonan pengunduran diri?",
      answer:
        "Untuk mengajukan permohonan pengunduran diri, Anda perlu mengisi formulir pengunduran diri yang dapat diunduh di halaman Unduhan. Formulir tersebut harus ditandatangani oleh Anda dan orang tua/wali. Selain itu, Anda juga perlu melampirkan surat pernyataan pengunduran diri yang menyebutkan alasan pengunduran diri, fotokopi KTP, dan kartu mahasiswa asli. Dokumen-dokumen tersebut diserahkan ke kantor Fakultas Syariah dan Hukum untuk diproses.",
    },
    {
      question: "Berapa biaya untuk legalisir ijazah dan transkrip nilai?",
      answer:
        "Biaya untuk legalisir ijazah adalah Rp 5.000 per lembar, sedangkan untuk legalisir transkrip nilai adalah Rp 3.000 per lembar. Pembayaran dapat dilakukan melalui transfer bank ke rekening resmi Fakultas Syariah dan Hukum atau langsung di kantor fakultas.",
    },
    {
      question: "Apakah saya bisa mengajukan permohonan surat keterangan aktif kuliah secara online?",
      answer:
        "Ya, Anda dapat mengajukan permohonan surat keterangan aktif kuliah secara online melalui website ini. Caranya adalah dengan login ke akun Anda, pilih menu 'Layanan', kemudian pilih 'Permohonan Surat Keterangan Aktif Kuliah'. Isi formulir yang disediakan dan unggah dokumen yang diperlukan. Surat keterangan aktif kuliah biasanya akan siap dalam waktu 1-2 hari kerja.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tanya Jawab (FAQ)</h1>
        <p className="text-gray-600 mb-8">
          Berikut adalah beberapa pertanyaan yang sering diajukan mengenai layanan akademik Fakultas Syariah dan Hukum.
        </p>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-gray-800">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <p className="text-gray-700">
            Jika Anda memiliki pertanyaan lain yang tidak tercantum di sini, silakan hubungi kami melalui halaman{" "}
            <a href="/kontak" className="text-green-600 hover:text-green-800 hover:underline">
              Kontak Kami
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

