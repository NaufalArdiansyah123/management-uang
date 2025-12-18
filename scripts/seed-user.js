/*
Script to create a confirmed test user and seed a basic profile.
Usage:
  1. Copy .env.example -> .env.local and set SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL
  2. npm install dotenv @supabase/supabase-js
  3. node scripts/seed-user.js

Security: keep SUPABASE_SERVICE_ROLE_KEY secret. Do NOT commit .env.local.
*/

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRole) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment')
  process.exit(1)
}

const supabase = createClient(url, serviceRole)

async function run() {
  try {
    const email = process.env.SEED_USER_EMAIL || 'test@example.com'
    const password = process.env.SEED_USER_PASSWORD || 'Password123!'

    console.log('Creating user:', email)
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (error) {
      console.error('Error creating user:', error)
      process.exit(1)
    }

    const user = data.user || data
    console.log('Created user id:', user.id)

    // Insert minimal profile
    const { error: pErr } = await supabase.from('profiles').upsert({ id: user.id, email })
    if (pErr) {
      console.error('Error inserting profile:', pErr)
    } else {
      console.log('Profile created/updated')
    }

    // Optionally seed default categories (per-user)
    const categories = [
      { user_id: user.id, name: 'Makanan', color: '#F97316', icon: 'food' },
      { user_id: user.id, name: 'Transport', color: '#2563EB', icon: 'car' },
      { user_id: user.id, name: 'Gaji', color: '#16A34A', icon: 'wallet' },
      { user_id: user.id, name: 'Hiburan', color: '#EF4444', icon: 'music' }
    ]

    const { error: cErr } = await supabase.from('categories').insert(categories)
    if (cErr) console.error('Error inserting categories:', cErr)
    else console.log('Default categories inserted')

    console.log('Done. You can now login with:', email, '/', password)
  } catch (e) {
    console.error('Unexpected error', e)
    process.exit(1)
  }
}

run()
