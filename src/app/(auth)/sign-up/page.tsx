import { RegisterForm } from '@/app/features/auth/components/form/registerForm'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

export default async function Page() {
  await requireUnauth()
  return (
    <div>
      <RegisterForm/>
    </div>
  )
}
