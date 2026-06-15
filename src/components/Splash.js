import React, { useState, useEffect } from 'react';

const Splash = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Total duration of splash screen display
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
        onComplete();
      }, 600);
    }, 4500); // 4.5 seconds to display the brand logo clearly

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10 transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      } bg-white`}
    >
      <img 
        src="/images/logo.png" 
        alt="Adiray Books" 
        className="animate-fade-in-scale select-none pointer-events-none w-auto h-auto max-w-full max-h-full object-contain"
      />

      {/* Custom styles for logo scaling animation */}
      <style>{`
        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.97);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Splash;
