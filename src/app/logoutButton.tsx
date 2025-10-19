'use client';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import React from 'react'
import { toast } from 'sonner';

const LogoutButton = () => {
    const logOut = async () => {
    await signOut({
       fetchOptions: {
        onSuccess: () => {
            window.location.href = "/login"

        },
        onError: (ctx) => {
            toast.error(ctx.error.message);
        }
       }
    });
  }
  return (
    <Button onClick={logOut}>Logout</Button>
  )
}

export default LogoutButton;
