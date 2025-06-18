import React from 'react';
import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};


export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-screen-xl mx-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
