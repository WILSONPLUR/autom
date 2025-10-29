'use client';
import React from 'react'
import { useCreateWorkflow, useWorkflows } from '../hooks/use-workflow';
import EntityHeader, { EntityContainer } from '@/components/entities';
import { useUpgradeModal } from '../hooks/use-upgrade-modal';
import { useRouter } from 'next/navigation';

const WorkflowsList = () => {
    const workflows = useWorkflows();
  return (
    <div>
      {JSON.stringify(workflows.data, null, 2)}
    </div>
  )
}

export const WorkflowsHeader = ({disabled}: {disabled?: boolean}) => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const {modal, handleError} = useUpgradeModal();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data?.id}`);
      },
      onError: (error) => {
        handleError(error);
      }
    });
  }
  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your automation workflows"
        onNew={handleCreate}
        newButtonLabel='New Workflow'
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  )
}

export const WorkflowsContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <EntityContainer header={<WorkflowsHeader />} search={<></>} pagination={<></>}>
        {children}
      </EntityContainer>
    </>
  )
}

export default WorkflowsList;
