import React, { useEffect, useState } from "react";

// Modern animated loader with fade-out and pulse effect
export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setFade(false);
    };
    const handleStop = () => {
      setFade(true);
      setTimeout(() => setLoading(false), 400); // fade out
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleStart);
      window.addEventListener('load', handleStop);
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', handleStop);
    }
    const timeout = setTimeout(handleStop, 2000);
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', handleStart);
        window.removeEventListener('load', handleStop);
      }
      if (typeof document !== 'undefined') {
        document.removeEventListener('DOMContentLoaded', handleStop);
      }
      clearTimeout(timeout);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#10e36f]/80 to-[#0a1f1c]/90 transition-opacity duration-400 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Animated pulse ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#10e36f]/30 animate-ping"></span>
        {/* Animated logo (KuCoin/Supabase style) */}
        <svg className="w-16 h-16 animate-spin-slow drop-shadow-lg" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="8" width="48" height="48" rx="12" fill="#10e36f" opacity="0.15" />
          <path d="M20 32L32 44L44 32" stroke="#10e36f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 20V44" stroke="#10e36f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="32" r="28" stroke="#10e36f" strokeWidth="4" opacity="0.2" />
        </svg>
        <style>{`
          @keyframes spin-slow { 100% { transform: rotate(360deg); } }
          .animate-spin-slow { animation: spin-slow 1.2s cubic-bezier(.4,0,.2,1) infinite; }
        `}</style>
      </div>
    </div>
  );
}
