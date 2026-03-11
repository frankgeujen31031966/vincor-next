'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vincor-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('vincor-cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('vincor-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[500]">
      <div className="dark:bg-dark-card rounded-xl p-6 shadow-xl text-white">
        <p className="mb-4">
          We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleDecline}
            className="border border-gray-600 text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}