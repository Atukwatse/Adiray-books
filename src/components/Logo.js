import React from 'react';

const Logo = ({ 
  variant = 'full', 
  theme = 'light', 
  animated = false, 
  className = '', 
  style = {} 
}) => {
  // Use horizontal version for horizontal layout, else fallback to full/vertical version
  if (variant === 'horizontal') {
    return (
      <img 
        src="/images/web%20log.png" 
        alt="Adiray Books" 
        className={`${className} object-contain`} 
        style={style}
      />
    );
  }

  // Fallback for full / vertical version
  return (
    <img 
      src="/images/logo.png" 
      alt="Adiray Books" 
      className={`${className} object-contain`} 
      style={style}
    />
  );
};

export default Logo;
