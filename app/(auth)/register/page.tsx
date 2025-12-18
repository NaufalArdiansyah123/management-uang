"use client"

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase/client'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [fullName, setFullName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
    if (password !== confirm) {
      setError('Password konfirmasi tidak cocok')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Registration failed')
        setLoading(false)
        return
      }

      // auto sign-in after server created confirmed user
      const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({ email, password })
      setLoading(false)
      if (signInErr) {
        setError(signInErr.message)
        return
      }
      try { if (signInData?.session?.access_token) document.cookie = `sb_token=${signInData.session.access_token}; path=/` } catch {}
      router.push('/dashboard')
    } catch (e) {
      setLoading(false)
      const msg = e instanceof Error ? e.message : String(e)
      setError(msg)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-400 to-teal-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Create Account Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Create Account</h1>
        </div>

        {/* Register Card */}
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
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

            {/* Mobile Number Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+ 123 456 789"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date Of Birth
              </label>
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="DD / MM /YYY"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="text-center text-xs text-gray-600 pt-2">
              By continuing, you agree to{' '}
              <a href="#" className="font-semibold text-gray-800 hover:text-emerald-600">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-gray-800 hover:text-emerald-600">
                Privacy Policy
              </a>
              .
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold py-3 rounded-full hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>

            {/* Log In Link */}
            <div className="text-center text-sm text-gray-600 pt-2">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 font-semibold hover:underline">
                Log In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}