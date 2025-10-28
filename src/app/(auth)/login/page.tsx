import { LoginForm } from '@/features/auth/components/form/loginForm'
import { requireUnauth } from '@/lib/auth-utils'
import React from 'react'

export default async function Page() {
  await requireUnauth();
  return (
    <div>
      <LoginForm/>
    </div>
  )
}
