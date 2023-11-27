import React from 'react'
import { AppProps } from 'next/app';
import { NextPage } from 'next';

import '../styles/style.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp;