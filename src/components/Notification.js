import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gold text-charcoal px-6 py-3 rounded-lg shadow-medium z-50 animate-slide-in-right font-semibold">
      <i className="fas fa-check-circle mr-2"></i>
      {message}
    </div>
  );
};

export default Notification;
