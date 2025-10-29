'use client';
import { Button } from '@/components/ui/button'
import { checkout } from '@/lib/auth-client'
import React from 'react'
import { check } from 'zod';

const CheckoutButton = () => {
    const handleCheckout = () => {
        checkout({slug: "pro"});
    }
   return (
      <Button onClick={handleCheckout}>Checkout</Button>
  )
}

export default CheckoutButton;
