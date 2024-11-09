// Badge.jsx
import React from 'react';

export const Badge = ({ children, className }) => {
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-white ${className}`}>
      {children}
    </span>
  );
};
