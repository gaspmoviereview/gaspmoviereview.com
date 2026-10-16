import React from 'react';
export function Logo({ variant = 'light', width = 64, assetBase = '', alt = 'Gasp Movie Review', style }) {
  const src = assetBase + (variant === 'dark' ? 'assets/logo-dark.png' : 'assets/logo-light.png');
  return <img src={src} alt={alt} style={{ width, height: 'auto', display: 'block', ...style }} />;
}