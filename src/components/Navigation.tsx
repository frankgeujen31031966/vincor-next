'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Klachten',
    href: '/klachten',
    children: [
      { label: 'Kaakpijn', href: '/klachten/kaakpijn' },
      { label: 'Hoofdpijn & Migraine', href: '/klachten/hoofdpijn-migraine' },
      { label: 'Tinnitus', href: '/klachten/tinnitus' },
      { label: 'Zenuwpijn', href: '/klachten/zenuwpijn' },
      { label: 'Tandenknarsen', href: '/klachten/tandenknarsen' },
      { label: 'Stijve Nek', href: '/klachten/stijve-nek' },
      { label: 'Rug- & Nekklachten', href: '/klachten/rug-nekklachten' },
    ],
  },
  {
    label: 'Diagnostiek',
    href: '/diagnostiek',
  },
  {
    label: 'Behandeling',
    href: '/behandeling',
  },
  {
    label: 'Over Ons',
    href: '/over-ons',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: 'Kennisbank',
    href: '/kennisbank',
  },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-[350ms] ${
        isScrolled
          ? 'bg-white/92 backdrop-blur-xl shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/vincor-logo.webp"
            alt="Vincor"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                href={item.href}
                className="text-white hover:text-teal-400 transition-colors font-medium"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white rounded-xl shadow-xl p-3 min-w-[220px] transition-all z-[250]">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={child.href}
                      className="block px-4 py-2 text-gray-800 hover:bg-teal-50 rounded-lg transition-colors"
                      onClick={handleMobileClose}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Language Selector */}
          <div className="flex items-center gap-3 ml-4">
            <span className="text-white text-sm font-medium">NL</span>
            <span className="text-white/60 text-sm">|</span>
            <span className="text-white text-sm font-medium">EN</span>
            <span className="text-white/60 text-sm">|</span>
            <span className="text-white text-sm font-medium">FR</span>
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="bg-teal text-white px-5 py-2.5 rounded-full font-semibold hover:bg-teal-600 transition-colors"
          >
            Boek Gratis Scan
          </Link>
        </div>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden text-white flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileOpen ? 'rotate-45 translate-y-2.5' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileOpen ? '-rotate-45 -translate-y-2.5' : ''
            }`}
          />
        </button>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div className="fixed inset-0 bg-[#0e0e0e] z-[300] flex flex-col items-center justify-center gap-6 text-white text-xl">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                <Link
                  href={item.href}
                  className="block py-2 hover:text-teal-400 transition-colors"
                  onClick={handleMobileClose}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-0 top-8 w-[200px] bg-[#1a1a1a] rounded-xl shadow-xl overflow-hidden">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className="block px-4 py-3 text-gray-300 hover:bg-teal-600 hover:text-white transition-colors"
                        onClick={handleMobileClose}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Language Selector */}
            <div className="flex items-center gap-3 text-lg">
              <span className="font-medium">NL</span>
              <span className="text-gray-500">|</span>
              <span className="font-medium">EN</span>
              <span className="text-gray-500">|</span>
              <span className="font-medium">FR</span>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="bg-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors"
              onClick={handleMobileClose}
            >
              Boek Gratis Scan
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}