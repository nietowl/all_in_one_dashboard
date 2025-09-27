import React from 'react';

const GlassPanel = ({
  children,
  className = '',
  variant = 'default',
  blur = 'md',
  opacity = 'light',
  ...props
}) => {
  const blurLevels = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const opacityLevels = {
    light: 'bg-white/5 border-white/10',
    medium: 'bg-white/10 border-white/20',
    heavy: 'bg-white/20 border-white/30',
    dark: 'bg-black/20 border-white/10',
    colored: 'bg-cyan-500/10 border-cyan-500/30',
  };

  const variants = {
    default: `
      rounded-xl border
      ${blurLevels[blur]}
      ${opacityLevels[opacity]}
      shadow-lg
    `,
    neon: `
      rounded-xl border-2 border-cyan-400/50
      ${blurLevels[blur]}
      bg-cyan-500/5
      shadow-lg shadow-cyan-400/25
      relative
      before:absolute before:inset-0 before:rounded-xl
      before:bg-gradient-to-br before:from-cyan-400/10 before:to-purple-400/10
      before:pointer-events-none
    `,
    threat: `
      rounded-xl border border-red-500/40
      ${blurLevels[blur]}
      bg-red-500/5
      shadow-lg shadow-red-500/20
    `,
    cyberpunk: `
      rounded-xl border border-purple-500/40
      ${blurLevels[blur]}
      bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5
      shadow-lg shadow-purple-500/20
      relative
      before:absolute before:inset-0 before:rounded-xl
      before:bg-gradient-to-br before:from-purple-400/5 before:to-cyan-400/5
      before:pointer-events-none
    `,
  };

  return (
    <div
      className={`
        ${variants[variant]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;