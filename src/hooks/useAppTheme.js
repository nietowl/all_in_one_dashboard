import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

// Custom hook for easier theme access
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};