import CheckoutButton from '@/app/checkoutButton';
import LogoutButton from '@/app/logoutButton';
import { Button } from '@/components/ui/button';
import { checkout } from '@/lib/auth-client';
import { requireAuth } from '@/lib/auth-utils';
import { HydrateClient } from '@/trpc/server';
import { ErrorBoundary} from "react-error-boundary"
import React, { Suspense } from 'react'
import WorkflowsList, { WorkflowsContainer } from '@/features/workflows/components/workflows';

const WorkflowsPage = async() => {
  await requireAuth();
  return (
    <WorkflowsContainer>
      <HydrateClient>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense>
          <WorkflowsList/>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkflowsContainer>
    
  )
}

export default WorkflowsPage;
