import React from 'react';

const Button3D = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none';

  const variants = {
    primary: `
      bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
      text-white shadow-lg shadow-blue-500/25
      hover:shadow-xl hover:shadow-blue-500/40
      hover:-translate-y-0.5
      focus:ring-blue-500
      before:absolute before:inset-0 before:rounded-lg
      before:bg-gradient-to-br before:from-white/20 before:to-transparent
      before:opacity-0 hover:before:opacity-100 before:transition-opacity
    `,
    secondary: `
      bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800
      text-white shadow-lg shadow-gray-500/25
      hover:shadow-xl hover:shadow-gray-500/40
      hover:-translate-y-0.5
      focus:ring-gray-500
      before:absolute before:inset-0 before:rounded-lg
      before:bg-gradient-to-br before:from-white/20 before:to-transparent
      before:opacity-0 hover:before:opacity-100 before:transition-opacity
    `,
    success: `
      bg-gradient-to-br from-green-500 via-green-600 to-green-700
      text-white shadow-lg shadow-green-500/25
      hover:shadow-xl hover:shadow-green-500/40
      hover:-translate-y-0.5
      focus:ring-green-500
      before:absolute before:inset-0 before:rounded-lg
      before:bg-gradient-to-br before:from-white/20 before:to-transparent
      before:opacity-0 hover:before:opacity-100 before:transition-opacity
    `,
    danger: `
      bg-gradient-to-br from-red-500 via-red-600 to-red-700
      text-white shadow-lg shadow-red-500/25
      hover:shadow-xl hover:shadow-red-500/40
      hover:-translate-y-0.5
      focus:ring-red-500
      before:absolute before:inset-0 before:rounded-lg
      before:bg-gradient-to-br before:from-white/20 before:to-transparent
      before:opacity-0 hover:before:opacity-100 before:transition-opacity
    `,
    warning: `
      bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700
      text-white shadow-lg shadow-amber-500/25
      hover:shadow-xl hover:shadow-amber-500/40
      hover:-translate-y-0.5
      focus:ring-amber-500
      before:absolute before:inset-0 before:rounded-lg
      before:bg-gradient-to-br before:from-white/20 before:to-transparent
      before:opacity-0 hover:before:opacity-100 before:transition-opacity
    `,
    ghost: `
      bg-transparent text-gray-300 border border-gray-600
      hover:bg-gray-800/50 hover:border-gray-500
      hover:shadow-lg hover:shadow-gray-500/10
      hover:-translate-y-0.5
      focus:ring-gray-500
    `,
    cyberpunk: `
      bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500
      text-white shadow-lg shadow-cyan-500/25
      hover:shadow-xl hover:shadow-purple-500/40
      hover:-translate-y-0.5
      focus:ring-cyan-500
      before:absolute before:inset-0 before:rounded-lg
      before:bg-gradient-to-br before:from-white/20 before:to-transparent
      before:opacity-0 hover:before:opacity-100 before:transition-opacity
      after:absolute after:inset-0 after:rounded-lg
      after:bg-gradient-to-br after:from-transparent after:via-transparent after:to-black/20
    `
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-md gap-1',
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2 text-sm rounded-lg gap-2',
    lg: 'px-6 py-3 text-base rounded-lg gap-2',
    xl: 'px-8 py-4 text-lg rounded-xl gap-3'
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed transform-none hover:transform-none hover:shadow-none pointer-events-none'
    : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </span>
    </button>
  );
};

export default Button3D;