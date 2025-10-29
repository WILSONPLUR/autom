import React from 'react'

interface PageProps {
    params: Promise<{
        executionId: string
    }
    >
}

const ExecutionIdPage = async({params}: PageProps) => {
    const {executionId} = await params;
  return (
    <div>
      <h1>{executionId}</h1>
    </div>
  )
}

export default ExecutionIdPage
