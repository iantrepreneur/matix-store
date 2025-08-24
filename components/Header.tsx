"use client";

import { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X, Mic, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CartSidebar from './CartSidebar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-50">
        {/* Top Bar - Gris clair */}
        <div className="bg-gray-100 text-gray-700 text-sm py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">📞</span>
              <span>We are available 24/7, Need help?</span>
              <span className="text-green-600 font-semibold">+099949343</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-green-600">About Us</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-green-600">Contact Us</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-green-600">My Account</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-green-600 flex items-center gap-1">
                🔒 Logout
              </a>
            </div>
          </div>
        </div>

        {/* Main Header - Vert */}
        <div className="bg-green-500 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div className="bg-white text-green-500 p-2 rounded-lg mr-3">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">KACHA</h1>
                  <p className="text-xs opacity-90">B A Z A R</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for products (e.g. shirt, pant)"
                    className="w-full bg-white text-gray-900 border-0 rounded-lg pl-4 pr-12 py-3 text-sm"
                  />
                  <Button 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-md px-3"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                {/* Cart */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative text-white hover:bg-green-600 p-2"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    2
                  </span>
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="text-white hover:bg-green-600 p-2">
                  <Bell className="h-6 w-6" />
                </Button>

                {/* User Profile */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-white hover:bg-green-600"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden mt-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-white text-gray-900 border-0 rounded-lg pl-4 pr-12 py-3"
                />
                <Button 
                  size="sm" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-md px-3"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Blanc */}
        <div className="bg-white border-b border-gray-200 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Left Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <div className="flex items-center gap-1 text-gray-700 hover:text-green-600 cursor-pointer font-medium">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">About Us</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Contact Us</a>
                <div className="flex items-center gap-1 text-gray-700 hover:text-green-600 cursor-pointer font-medium">
                  <span>Pages</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="relative">
                  <a href="#" className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm font-medium">
                    Offers
                  </a>
                  <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
                </div>
              </nav>

              {/* Right Navigation */}
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="flex items-center gap-2">
                  <img src="https://flagcdn.com/w20/gb.png" alt="English" className="w-4 h-4" />
                  <span className="text-gray-700">English</span>
                </div>
                <a href="#" className="text-gray-700 hover:text-green-600">Privacy Policy</a>
                <a href="#" className="text-gray-700 hover:text-green-600">Terms & Conditions</a>
              </div>

              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
                  <nav className="flex flex-col space-y-4">
                    <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Categories</a>
                    <a href="#" className="text-gray-700 hover:text-green-600 font-medium">About Us</a>
                    <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Contact Us</a>
                    <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Pages</a>
                    <a href="#" className="text-red-500 hover:text-red-600 font-medium">Offers</a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}