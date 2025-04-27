
'use client'

import { signOut } from 'next-auth/react'
import React from 'react'



const LogoutBtn = ({ children }: { children: React.ReactNode }) => {
    return (
        <button onClick={() => signOut()}>{children}</button>
    )
}

export default LogoutBtn