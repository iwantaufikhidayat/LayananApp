"use client"

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import ServiceCard from "./ServiceCard"

interface Service {
  id: number
  name: string
  url: string
  description: string
  category_id: number
  staf: string
  foto: string
}

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("academic_services").select("*").limit(4)

        if (error) {
          throw error
        }

        if (data) {
          setServices(data)
        }
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Layanan Unggulan</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Layanan Unggulan</h2>
        <p className="text-gray-600 mt-2">Layanan akademik yang paling banyak diakses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              name={service.name}
              url={service.url}
              description={service.description}
              staf={service.staf}
              foto={service.foto}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Belum ada layanan yang tersedia.</p>
          </div>
        )}
      </div>
    </div>
  )
}

