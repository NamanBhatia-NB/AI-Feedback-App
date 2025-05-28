"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BarChart2, MessageSquare, User, Home, Info, Mail } from "lucide-react";
import { useSessionContext } from "@/app/components/SessionWrapper";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { session, logout } = useSessionContext();

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI Feedback</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <>
                <Link href="/" className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link href="/dashboard" className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                  <BarChart2 size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link href="/feedback" className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                  <MessageSquare size={18} />
                  <span>Feedback</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link href="/login" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200">
                  Login
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden space-y-4 p-4 bg-gray-800 rounded-b-lg shadow-lg animate-fade-in">
            {session ? (
              <>
                <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md transition-colors duration-200">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md transition-colors duration-200">
                  <BarChart2 size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link href="/feedback" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md transition-colors duration-200">
                  <MessageSquare size={18} />
                  <span>Feedback</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md transition-colors duration-200">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link href="/login" className="block w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-center transition-colors duration-200">
                  Login
                </Link>
                <Link href="/signup" className="block w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-center transition-colors duration-200">
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
