import React from 'react';

const Logo = ({ 
  variant = 'full', 
  theme = 'light', 
  animated = false, 
  className = '', 
  style = {} 
}) => {
  // Define colors based on theme
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#121212';
  const taglineColor = isDark ? '#D4AF37' : '#555555';
  const letterAColor = isDark ? '#FFFFFF' : '#121212';
  const baseCircleColor = isDark ? '#111827' : '#F5F2EB'; // Matches parent background (gray-900 / cream)

  // Gold page ray gradient color stops
  const rayFill = 'url(#logo-gold-gradient)';

  // Ray parameters
  const raysCount = 10;
  
  if (variant === 'horizontal') {
    const cx = 72;
    const cy = 60;
    const rStart = 13;
    const rEnd = 52;
    const wStart = 3.2;
    const wEnd = 7.5;

    // Generate rotated groups for inline horizontal layout
    const rayElements = [];
    for (let i = 0; i < raysCount; i++) {
      const angleDeg = -90 + (i * 90) / (raysCount - 1);
      
      const rayStyle = animated ? {
        transformOrigin: `${cx}px ${cy}px`,
        animation: `logo-horizontal-fan-out-${i} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        animationDelay: `${i * 45}ms`,
        opacity: 0,
      } : {
        transform: `rotate(${angleDeg}deg)`,
        transformOrigin: `${cx}px ${cy}px`
      };

      rayElements.push(
        <path
          key={i}
          d={`M ${cx + rStart} ${cy - wStart/2} L ${cx + rEnd} ${cy - wEnd/2} L ${cx + rEnd} ${cy + wEnd/2} L ${cx + rStart} ${cy + wStart/2} Z`}
          fill={rayFill}
          style={rayStyle}
        />
      );
    }

    return (
      <svg 
        viewBox="0 0 460 120" 
        className={className} 
        style={style}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3B217" />
            <stop offset="50%" stopColor="#FBD561" />
            <stop offset="100%" stopColor="#D48B00" />
          </linearGradient>
          {animated && (
            <style>{`
              ${Array.from({ length: raysCount }).map((_, i) => {
                const angleDeg = -90 + (i * 90) / (raysCount - 1);
                return `
                  @keyframes logo-horizontal-fan-out-${i} {
                    0% {
                      transform: rotate(-90deg);
                      opacity: 0;
                    }
                    100% {
                      transform: rotate(${angleDeg}deg);
                      opacity: 1;
                    }
                  }
                `;
              }).join('\n')}
              @keyframes logo-fade-in {
                from { opacity: 0; transform: translateX(-10px); }
                to { opacity: 1; transform: translateX(0); }
              }
              .logo-text-fade {
                animation: logo-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                animation-delay: 0.5s;
                opacity: 0;
              }
            `}</style>
          )}
        </defs>

        {/* Graphic symbol group */}
        <g>
          {/* Letter 'A' */}
          <text 
            x="24" 
            y="76" 
            fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif" 
            fontSize="65" 
            fontWeight="bold" 
            fill={letterAColor}
          >
            A
          </text>
          
          {/* Ray pages */}
          {rayElements}

          {/* Masking semi-circle at base */}
          <path 
            d={`M ${cx - 12} ${cy} A 12 12 0 0 1 ${cx + 12} ${cy} Z`} 
            fill={baseCircleColor} 
          />
        </g>

        {/* Text and tagline group */}
        <g className={animated ? 'logo-text-fade' : ''}>
          {/* Brand Name */}
          <text 
            x="135" 
            y="54" 
            fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif" 
            fontWeight="bold" 
            fontSize="28" 
            letterSpacing="2.5" 
            fill={textColor}
          >
            ADIRAY BOOKS
          </text>
          
          {/* Tagline */}
          <text 
            x="135" 
            y="77" 
            fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif" 
            fontSize="10.5" 
            fontStyle="italic"
            fontWeight="500"
            letterSpacing="0.2" 
            fill={taglineColor}
          >
            Inspiring minds to Read. Learn & Grow
          </text>
        </g>
      </svg>
    );
  }

  // Symbol and Full Layout Viewports
  const cx = 295;
  const cy = 205;
  const rStart = 38;
  const rEnd = 160;
  const wStart = 10;
  const wEnd = 24;

  const rayElements = [];
  for (let i = 0; i < raysCount; i++) {
    const angleDeg = -90 + (i * 90) / (raysCount - 1);
    
    const rayStyle = animated ? {
      transformOrigin: `${cx}px ${cy}px`,
      animation: `logo-fan-out-${i} 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      animationDelay: `${i * 50}ms`,
      opacity: 0,
    } : {
      transform: `rotate(${angleDeg}deg)`,
      transformOrigin: `${cx}px ${cy}px`
    };

    rayElements.push(
      <path
        key={i}
        d={`M ${cx + rStart} ${cy - wStart/2} L ${cx + rEnd} ${cy - wEnd/2} L ${cx + rEnd} ${cy + wEnd/2} L ${cx + rStart} ${cy + wStart/2} Z`}
        fill={rayFill}
        style={rayStyle}
      />
    );
  }

  const isSymbolOnly = variant === 'symbol';
  const viewBox = isSymbolOnly ? '140 40 330 200' : '0 0 600 400';

  return (
    <svg 
      viewBox={viewBox} 
      className={className} 
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3B217" />
          <stop offset="50%" stopColor="#FBD561" />
          <stop offset="100%" stopColor="#D48B00" />
        </linearGradient>
        {animated && (
          <style>{`
            ${Array.from({ length: raysCount }).map((_, i) => {
              const angleDeg = -90 + (i * 90) / (raysCount - 1);
              return `
                @keyframes logo-fan-out-${i} {
                  0% {
                    transform: rotate(-90deg);
                    opacity: 0;
                  }
                  100% {
                    transform: rotate(${angleDeg}deg);
                    opacity: 1;
                  }
                }
              `;
            }).join('\n')}
            @keyframes logo-text-appear {
              from { opacity: 0; transform: translateY(15px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .logo-text-fade-up {
              animation: logo-text-appear 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              animation-delay: 0.6s;
              opacity: 0;
            }
          `}</style>
        )}
      </defs>

      {/* Graphic symbol group */}
      <g>
        {/* Letter 'A' */}
        <text 
          x="185" 
          y="245" 
          fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif" 
          fontSize="180" 
          fontWeight="bold" 
          fill={letterAColor}
        >
          A
        </text>
        
        {/* Ray pages */}
        {rayElements}

        {/* Masking semi-circle at base */}
        <path 
          d={`M ${cx - 35} ${cy} A 35 35 0 0 1 ${cx + 35} ${cy} Z`} 
          fill={baseCircleColor} 
        />
      </g>

      {/* Text group - render only when variant is 'full' */}
      {!isSymbolOnly && (
        <g className={animated ? 'logo-text-fade-up' : ''}>
          {/* Brand Name */}
          <text 
            x="300" 
            y="322" 
            fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif" 
            fontWeight="bold" 
            fontSize="44" 
            letterSpacing="5" 
            textAnchor="middle"
            fill={textColor}
          >
            ADIRAY BOOKS
          </text>
          
          {/* Tagline */}
          <text 
            x="300" 
            y="358" 
            fontFamily="'Playfair Display', 'Georgia', 'Times New Roman', serif" 
            fontSize="16.5" 
            fontStyle="italic"
            fontWeight="500"
            letterSpacing="0.5" 
            textAnchor="middle"
            fill={taglineColor}
          >
            Inspiring minds to Read. Learn & Grow
          </text>
        </g>
      )}
    </svg>
  );
};

export default Logo;
