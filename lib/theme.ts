// lib/theme.ts
// Dark-first design tokens for spacing, colors, radii and type sizes.
// Use these role-based colors throughout the app. Do not hardcode colors elsewhere.
const theme = {
  colors: {
    // Primary brand color and on-primary text
    primary: '#6EE7B7', // soft mint green for accent on dark backgrounds
    onPrimary: '#042017',

    // Surfaces
    surface: '#071014', // main background
    surfaceVariant: '#0E1A1C',
    elevatedSurface: '#0B1416',

    // Text
    onSurface: '#E6F6F2',
    onSurfaceMuted: '#9AA7A5',

    // Outlines and subtle separators
    outline: '#133033',

    // Special
    error: '#FF6B6B',
    success: '#22C55E',
  },
  spacing: {
    xs: 6,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 6,
    md: 10,
    lg: 14,
  },
  type: {
    h1: 28,
    h2: 20,
    body: 16,
    caption: 13,
  },
};

export default theme;