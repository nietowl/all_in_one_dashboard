import React from 'react';

const Card3D = ({
  children,
  className = '',
  hover = true,
  glow = false,
  variant = 'default',
  onClick,
  ...props
}) => {
  const baseStyles = `
    relative overflow-hidden rounded-xl transition-all duration-300
    ${hover ? 'hover:-translate-y-1 hover:scale-[1.02]' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  const variants = {
    default: `
      bg-gray-900/50 border border-gray-700/50
      backdrop-blur-sm shadow-lg
      ${hover ? 'hover:shadow-2xl hover:shadow-gray-500/10' : ''}
      ${glow ? 'shadow-blue-500/20' : ''}
    `,
    glass: `
      bg-white/5 border border-white/10
      backdrop-blur-md shadow-lg
      ${hover ? 'hover:shadow-2xl hover:shadow-white/10' : ''}
      ${glow ? 'shadow-cyan-500/20' : ''}
      before:absolute before:inset-0 before:rounded-xl
      before:bg-gradient-to-br before:from-white/10 before:to-transparent
      before:pointer-events-none
    `,
    cyberpunk: `
      bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-cyan-900/20
      border border-cyan-500/30
      shadow-lg shadow-cyan-500/20
      ${hover ? 'hover:shadow-2xl hover:shadow-cyan-500/30' : ''}
      before:absolute before:inset-0 before:rounded-xl
      before:bg-gradient-to-br before:from-cyan-500/10 before:to-purple-500/10
      before:pointer-events-none before:opacity-0
      ${hover ? 'hover:before:opacity-100' : ''}
      before:transition-opacity before:duration-300
    `,
    neon: `
      bg-gray-900/80 border-2 border-cyan-400/50
      shadow-lg shadow-cyan-400/25
      ${hover ? 'hover:shadow-2xl hover:shadow-cyan-400/40 hover:border-cyan-400/80' : ''}
      relative
      before:absolute before:inset-0 before:rounded-xl
      before:bg-gradient-to-br before:from-cyan-400/5 before:to-purple-400/5
      before:pointer-events-none
    `,
    threat: `
      bg-gradient-to-br from-red-900/30 via-gray-900/50 to-orange-900/30
      border border-red-500/30
      shadow-lg shadow-red-500/20
      ${hover ? 'hover:shadow-2xl hover:shadow-red-500/30' : ''}
      before:absolute before:inset-0 before:rounded-xl
      before:bg-gradient-to-br before:from-red-500/10 before:to-orange-500/10
      before:pointer-events-none before:opacity-0
      ${hover ? 'hover:before:opacity-100' : ''}
      before:transition-opacity before:duration-300
    `
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card3D;