import CheckoutButton from '@/app/checkoutButton';
import LogoutButton from '@/app/logoutButton';
import { Button } from '@/components/ui/button';
import { checkout } from '@/lib/auth-client';
import { requireAuth } from '@/lib/auth-utils';
import React from 'react'

const WorkflowsPage = async() => {
  await requireAuth();
  return (
    <div>
      <h1>Workflows</h1>
      <LogoutButton/>
      <CheckoutButton/>
    </div>
  )
}

export default WorkflowsPage;
