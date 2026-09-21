import React from "react";

export function BankilyLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-[#00A651] rounded-xl p-1.5 shadow-md border border-emerald-400/40 shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Rounded Green App Icon Background with Orange Accent Curve */}
        <rect width="100" height="100" rx="22" fill="#00A651" />
        <path
          d="M20 70 C30 85, 70 85, 80 70"
          stroke="#FF6B00"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Mobile Phone / b Letter Icon */}
        <rect x="34" y="22" width="32" height="52" rx="7" fill="white" />
        <circle cx="50" cy="65" r="3" fill="#00A651" />
        <path d="M42 32 H58 V52 H42 Z" fill="#00A651" />
        <circle cx="50" cy="42" r="6" fill="#FF6B00" />
      </svg>
    </div>
  );
}

export function MasrviLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-[#C8102E] rounded-xl p-1.5 shadow-md border border-rose-400/40 shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Crimson Red App Icon Background */}
        <rect width="100" height="100" rx="22" fill="#C8102E" />
        {/* Stylized M / Loop Logo Icon */}
        <path
          d="M24 68 V32 L50 56 L76 32 V68"
          stroke="white"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="30" r="7" fill="#FFC72C" />
      </svg>
    </div>
  );
}

export function SedadLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-[#004B93] rounded-xl p-1.5 shadow-md border border-blue-400/40 shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Deep Royal Blue Background */}
        <rect width="100" height="100" rx="22" fill="#004B93" />
        {/* Gold & White Exchange Loop Arrows Icon */}
        <path
          d="M25 50 C25 32, 50 25, 75 38"
          stroke="#FFB800"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M75 50 C75 68, 50 75, 25 62"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <polygon points="75,28 85,40 70,42" fill="#FFB800" />
        <polygon points="25,72 15,60 30,58" fill="white" />
      </svg>
    </div>
  );
}

export function CashLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-[#D97706] rounded-xl p-1.5 shadow-md border border-amber-400/40 shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <rect width="100" height="100" rx="22" fill="#D97706" />
        {/* Banknote icon */}
        <rect x="18" y="30" width="64" height="40" rx="6" fill="#15803D" stroke="white" strokeWidth="4" />
        <circle cx="50" cy="50" r="10" fill="#FEF08A" stroke="white" strokeWidth="3" />
        <text x="50" y="55" textAnchor="middle" fill="#15803D" fontSize="14" fontWeight="900">MRU</text>
      </svg>
    </div>
  );
}
