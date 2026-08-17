import React from 'react';

interface GarudaIconProps {
  className?: string;
}

export const GarudaIcon: React.FC<GarudaIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Garuda Pancasila"
    >
      {/* Crown / Head Crest */}
      <path
        d="M50 10 C46 14 43 19 44 24 C46 22 49 20 50 18 C51 20 54 22 56 24 C57 19 54 14 50 10 Z"
        fill="currentColor"
      />
      {/* Head & Beak */}
      <path
        d="M45 22 C45 27 47 31 50 33 C53 31 55 27 55 22 C53 20 47 20 45 22 Z"
        fill="currentColor"
      />
      <path
        d="M50 27 L54 30 L50 32 L46 30 Z"
        fill="#F59E0B"
      />
      {/* Golden Wings Left */}
      <path
        d="M44 32 C34 26 22 28 10 38 C14 44 20 48 26 50 C18 52 12 58 8 66 C15 68 24 67 31 63 C25 68 20 76 18 84 C28 82 36 76 42 68 C40 60 42 45 44 32 Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Golden Wings Right */}
      <path
        d="M56 32 C66 26 78 28 90 38 C86 44 80 48 74 50 C82 52 88 58 92 66 C85 68 76 67 69 63 C75 68 80 76 82 84 C72 82 64 76 58 68 C60 60 58 45 56 32 Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Tail Feathers */}
      <path
        d="M45 74 C43 83 41 90 40 95 C46 94 50 92 50 88 C50 92 54 94 60 95 C59 90 57 83 55 74 Z"
        fill="currentColor"
      />
      {/* Central Shield (Perisai Pancasila) */}
      <path
        d="M37 36 Q50 33 63 36 L63 56 Q50 72 37 56 Z"
        fill="#DC2626"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />
      {/* Inner White field of shield */}
      <path
        d="M39 38 L61 38 L61 54 Q50 68 39 54 Z"
        fill="#FAFAFA"
      />
      {/* Red half of perisai */}
      <path
        d="M39 38 L50 38 L50 63 Q44 59 39 54 Z"
        fill="#DC2626"
      />
      {/* Gold Center Star (Bintang) */}
      <polygon
        points="50,42 51.5,46.5 56,46.5 52.5,49.2 53.8,53.5 50,51 46.2,53.5 47.5,49.2 44,46.5 48.5,46.5"
        fill="#FBBF24"
        stroke="#B45309"
        strokeWidth="0.5"
      />
      {/* Bhinneka Tunggal Ika Banner ribbon */}
      <path
        d="M30 84 C38 81 44 83 50 83 C56 83 62 81 70 84 L68 88 C62 86 56 87 50 87 C44 87 38 86 32 88 Z"
        fill="#FFFFFF"
        stroke="#44403C"
        strokeWidth="1"
      />
      {/* Claws gripping ribbon */}
      <circle cx="36" cy="83" r="2.5" fill="#F59E0B" />
      <circle cx="64" cy="83" r="2.5" fill="#F59E0B" />
    </svg>
  );
};
