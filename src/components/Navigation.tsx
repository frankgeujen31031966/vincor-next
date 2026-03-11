'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

interface NavigationProps {
  items: NavItem[];
  cta: string;
}

export default function Navigation({ items, cta }: NavigationProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const l = (href: string) => `/${locale}${href}`;

  const switchLocale = (newLocale: string) => {
    const rest = pathname.replace(/^\/(nl|en|fr)/, '');
    return `/${newLocale}${rest || ''}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

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
        <Link href={l('/')} className="flex-shrink-0">
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
          {items.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                href={l(item.href)}
                className={`hover:text-teal transition-colors font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white rounded-xl shadow-xl p-3 min-w-[220px] transition-all z-[250]">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={l(child.href)}
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
            {['nl', 'en', 'fr'].map((loc, i) => (
              <React.Fragment key={loc}>
                {i > 0 && <span className={`text-sm ${isScrolled ? 'text-gray-400' : 'text-white/60'}`}>|</span>}
                <Link href={switchLocale(loc)} className={`text-sm font-medium transition-colors ${locale === loc ? 'text-teal' : isScrolled ? 'text-gray-600 hover:text-teal' : 'text-white hover:text-teal'}`}>
                  {loc.toUpperCase()}
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href={l('/contact')}
            className="bg-teal text-white px-5 py-2.5 rounded-full font-semibold hover:bg-teal-600 transition-colors"
          >
            {cta}
          </Link>
        </div>

        {/* Mobile Burger Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${
              isMobileOpen ? 'rotate-45 translate-y-2.5' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${
              isMobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${
              isMobileOpen ? '-rotate-45 -translate-y-2.5' : ''
            }`}
          />
        </button>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div className="fixed inset-0 bg-[#0e0e0e] z-[300] flex flex-col items-center justify-center gap-6 text-white text-xl">
            {/* Close button */}
            <button
              onClick={handleMobileClose}
              className="absolute top-6 right-6 text-white hover:text-teal transition-colors p-2"
              aria-label="Close menu"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            {/* Home link */}
            <Link
              href={l('/')}
              className="block py-2 hover:text-teal transition-colors"
              onClick={handleMobileClose}
            >
              Home
            </Link>
            {items.map((item, index) => (
              <div key={index} className="relative">
                <Link
                  href={l(item.href)}
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
                        href={l(child.href)}
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
              {['nl', 'en', 'fr'].map((loc, i) => (
                <React.Fragment key={loc}>
                  {i > 0 && <span className="text-gray-500">|</span>}
                  <Link href={switchLocale(loc)} className={`font-medium transition-colors ${locale === loc ? 'text-teal' : 'hover:text-teal-400'}`} onClick={handleMobileClose}>
                    {loc.toUpperCase()}
                  </Link>
                </React.Fragment>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={l('/contact')}
              className="bg-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors"
              onClick={handleMobileClose}
            >
              {cta}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
