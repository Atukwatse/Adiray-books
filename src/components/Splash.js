import React, { useState, useEffect } from 'react';

const Splash = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingStage, setLoadingStage] = useState('initializing');

  useEffect(() => {
    const stages = [
      { name: 'initializing', duration: 1800 },
      { name: 'discovering', duration: 1500 },
      { name: 'curating', duration: 1600 },
      { name: 'finalizing', duration: 1200 }
    ];

    let currentStage = 0;
    let progressValue = 0;

    const loadingInterval = setInterval(() => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage];
        setLoadingStage(stage.name);
        
        const stageProgress = (100 / stages.length);
        progressValue = Math.min(progressValue + (stageProgress / (stage.duration / 100)), (currentStage + 1) * stageProgress);
        
        setProgress(progressValue);
        
        if (progressValue >= (currentStage + 1) * stageProgress) {
          currentStage++;
        }
      } else {
        clearInterval(loadingInterval);
        setProgress(100);
        setLoadingStage('complete');
        
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setIsLoading(false);
            onComplete();
          }, 600);
        }, 400);
      }
    }, 50);

    return () => clearInterval(loadingInterval);
  }, [onComplete]);

  if (!isLoading) return null;

  const getLoadingMessage = () => {
    const messages = {
      initializing: 'Opening the library doors...',
      discovering: 'Discovering new worlds...',
      curating: 'Curating your collection...',
      finalizing: 'Preparing your reading journey...',
      complete: 'Welcome to Adiray Books'
    };
    return messages[loadingStage];
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-charcoal via-gray-900 to-black transition-opacity duration-700 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, #D4AF37 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, #D4AF37 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${6 + (i * 0.5)}s`
            }}
          >
            <div className="w-6 h-8 bg-gold opacity-10 rounded-sm transform rotate-12 shadow-lg"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Elegant Logo Animation */}
        <div className="mb-12 animate-fade-in-scale">
          <div className="relative inline-block">
            {/* Outer ring */}
            <div className="absolute inset-0 bg-gold rounded-full opacity-20 animate-ping"></div>
            {/* Middle ring */}
            <div className="absolute inset-2 bg-gold rounded-full opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            {/* Inner circle */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-gold to-yellow-600 rounded-full shadow-2xl flex items-center justify-center animate-float-logo">
              <div className="text-charcoal">
                <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Name with Elegant Typography */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-400 mb-3 leading-tight">
            Adiray Books
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-gold to-transparent mx-auto animate-expand-width" style={{ animationDelay: '0.6s' }}></div>
        </div>

        {/* Dynamic Loading Message */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-lg text-gray-300 font-light tracking-wide">
            {getLoadingMessage()}
          </p>
        </div>

        {/* Sophisticated Progress Bar */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="relative">
            {/* Progress bar background */}
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              {/* Animated progress fill */}
              <div 
                className="h-full bg-gradient-to-r from-gold via-yellow-400 to-gold rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
              </div>
            </div>
            {/* Progress percentage */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Loading</span>
              <span className="text-xs text-gold font-semibold">{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(12deg);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-15px) translateX(10px) rotate(15deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-8px) translateX(-5px) rotate(10deg);
            opacity: 0.15;
          }
          75% {
            transform: translateY(-20px) translateX(8px) rotate(18deg);
            opacity: 0.25;
          }
        }
        
        @keyframes float-logo {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes expand-width {
          0% {
            width: 0%;
            opacity: 0;
          }
          100% {
            width: 8rem;
            opacity: 1;
          }
        }
        
        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-float-slow {
          animation: float-slow ease-in-out infinite;
        }
        
        .animate-float-logo {
          animation: float-logo ease-in-out 3s infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-expand-width {
          animation: expand-width 1s ease-out forwards;
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Splash;
