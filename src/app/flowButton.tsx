'use client';
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client';
import { caller } from '@/trpc/server'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import React from 'react'

const FlowButton = ({onClick}: {onClick: () => void}) => {
    return (
    <Button onClick={onClick}>
      Create Workflow
    </Button>
  )
}

export default FlowButton;
