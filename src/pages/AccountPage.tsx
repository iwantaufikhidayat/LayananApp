"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "../contexts/AuthContext"

export default function AccountPage() {
  const { user, signOut, isAdmin } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true)

        if (user) {
          const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          if (error && error.code !== "PGRST116") {
            throw error
          }

          setProfile(data)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user])

  const handleSignOut = async () => {
    try {
      const { error } = await signOut()
      if (error) throw error
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Akun Saya</h1>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Informasi Akun</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status Email</p>
                  <p className="text-gray-800">{user?.email_confirmed_at ? "Terverifikasi" : "Belum Terverifikasi"}</p>
                </div>
                {profile && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Nama Lengkap</p>
                      <p className="text-gray-800">{profile.full_name || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-gray-800">{profile.role || "User"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <h3 className="text-blue-800 font-medium mb-2">Akses Admin</h3>
                <p className="text-blue-700 mb-3">
                  Anda memiliki akses admin. Anda dapat mengelola konten website melalui dashboard admin.
                </p>
                <Link
                  to="/admin"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Akses Dashboard Admin
                </Link>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

