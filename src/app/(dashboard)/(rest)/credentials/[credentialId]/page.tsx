import React from 'react'

interface PageProps {
    params: Promise<{
        credentialId: string;
    }>
}

const CredentialsIdPage = async ({params}: PageProps) => {
  const {credentialId} = await params;
  return (
    <div>
      <h1>{credentialId}</h1>
    </div>
  )
}

export default CredentialsIdPage
