'use client';

import { Toaster } from "react-hot-toast"

function ClientProvider() {
  return (
    <>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    </>
  )
}

export default ClientProvider