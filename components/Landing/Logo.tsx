import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="flex items-center relative group">
        <span className="text-4xl font-bold tracking-tight">
          {/* First part with primary gradient */}
          <span className="inline-block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">Eas</span>
          {/* Second part with complementary gradient */}
          <span className="inline-block bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300">mark</span>
        </span>
        
        {/* Animated underline effect */}
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default Logo;