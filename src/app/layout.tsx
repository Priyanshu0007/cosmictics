"use client"
import NavBar from '@/components/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { useState } from 'react'
import Cart from '@/components/Cart'
import Fav from '@/components/Fav'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Cosmictics',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCart,setShowCart]=useState(false);
  const [showFav,setShowFav]=useState(false);
  return (
    <html lang="en">
      <head>
        <title>Cosmictics</title>
        <link rel="icon" href="../../public/favicon.ico"></link>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
        <NavBar setShowCart={setShowCart} setShowFav={setShowFav}/>
        {showCart && <Cart setShowCart={setShowCart}/>}
        {showFav && <Fav setFavFav={setShowFav}/>}
        {children}
        <Footer/>
        </Provider>
      </body>
    </html>
  )
}
