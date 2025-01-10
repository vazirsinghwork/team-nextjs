'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Main } from 'next/document';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token)
    {
      router.push('/login')
    }
  }, []);

  return (
    <div>
    <aside>
      <div className='container-lg'>

      <Sidebar />
      </div>

    </aside>
    <div className="container" style={{marginLeft:'250px'}}>
    <Header />
    </div>


    <main className="main px-lg-6" style={{marginLeft:'250px'}}>
          <div className='container-lg'>
          {children}
          </div>
          </main>





    <Footer />
    </div>
  );
}