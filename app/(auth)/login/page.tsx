'use client'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Email dan password diperlukan')
      return
    }
    setLoading(true)
    // Supabase sign in
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) {
      setError(err.message)
      return
    }
    try {
      if (data?.session?.access_token) {
        document.cookie = `sb_token=${data.session.access_token}; path=/`
      }
    } catch (e) {
      // ignore
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome</h1>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username/Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username Or Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Log In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold py-3 rounded-full hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Log In'}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-sm font-semibold text-gray-800 hover:text-emerald-600 transition">
                Forgot Password?
              </a>
            </div>

            {/* Sign Up Button */}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-full hover:bg-gray-200 transition"
            >
              Sign Up
            </button>

            {/* Fingerprint Text */}
            <div className="text-center">
              <p className="text-sm text-gray-700">
                Use <span className="text-blue-500 font-semibold">Fingerprint</span> To Access
              </p>
            </div>

            {/* Social Login Divider */}
            <div className="text-center text-sm text-gray-500">
              or sign up with
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-emerald-400 hover:bg-emerald-50 transition"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button
                type="button"
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-emerald-400 hover:bg-emerald-50 transition"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-500 font-semibold hover:underline">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}