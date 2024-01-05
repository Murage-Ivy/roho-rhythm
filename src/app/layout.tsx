'use client'
import Frame from '@/components/frame'
import '@/styles/global.css'
import { useEffect, useState } from 'react'
import { AuthContext } from 'src/utils/context'
// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

type AccessTokenType = {
  accessToken: string
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<AccessTokenType | null>(null)

  useEffect(() => {
    try {
      const getAccessToken = async () => {
        const response = await fetch('/api/access-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }

        })
        const data = await response.json()
        if (response.ok) {
          setAccessToken(data.access_token)
        }
      }
      getAccessToken()

    }

    catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <html lang="en">
      <body className='body'>
        <AuthContext.Provider value={accessToken}>
          <Frame>
            {children}
          </Frame>
        </AuthContext.Provider>
      </body>
    </html>
  )
}
