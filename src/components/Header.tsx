'use client'
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 m-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="space-y-0.5">
              <h1 className="text-xl font-bold text-white tracking-tight">Marketing AI</h1>
              <p className="text-sm text-gray-400">Content Strategy Dashboard</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
              Dashboard
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
              Analytics
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
              Settings
            </a>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg bg-gray-700 text-gray-300 hover:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;