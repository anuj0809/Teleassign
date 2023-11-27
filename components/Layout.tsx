import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}



const Layout = ({ children, title = 'Home Page' }: Props) =>{ 
  //year
  const d = new Date();
  let year = d.getFullYear();
  
  return (
    <div className='w-full h-full'>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <header className='w-full h-full py-10'>
        <Link href={'/'} >
          <h1 className='mx-auto font- text-3xl text-center text-white'>Teleparty Assignment
          </h1>
        </Link>
      </header>
      {children}
      <div className='py-10'>
        <div className='text-center text-white'>
            <h1 className='text-xl'>Anuj Goyal<span className='text-black'>.</span></h1>
        </div>
      </div>
    </div>
  )
}
export default Layout
