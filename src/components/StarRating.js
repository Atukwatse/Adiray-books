import React from 'react';

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="fas fa-star text-gold"></i>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-gold"></i>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-gold"></i>
      );
    }
    
    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      {renderStars()}
    </div>
  );
};

export default StarRating;
