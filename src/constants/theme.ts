/**
 * Centralized theme tokens.
 * Replace hardcoded HEX values across components with these constants.
 * When dark mode is implemented, swap these via CSS variables.
 */

export const COLORS = {
  // Brand
  primary: '#C2714F',
  primaryLight: '#E5B567',
  primaryDark: '#3D2B1F',

  // Backgrounds
  bgMain: '#FAF7F2',
  bgCard: '#FFFFFF',
  bgSidebar: '#F5F0EB',
  bgHover: '#F0EAE3',

  // Text
  textPrimary: '#3D2B1F',
  textSecondary: '#8B7355',
  textMuted: '#B8A990',

  // Borders
  border: '#E8E0D6',
  borderLight: '#F0EAE3',

  // Status
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Canvas
  canvasBg: '#FAFAFA',
  canvasGrid: '#E0E0E0',
  canvasEdge: '#C2714F',
} as const

export type ThemeColor = keyof typeof COLORS

/**
 * CSS variable mapping for future dark mode support.
 * Usage: style={{ color: `var(--color-primary, ${COLORS.primary})` }}
 */
export const CSS_VARS = {
  '--color-primary': COLORS.primary,
  '--color-primary-light': COLORS.primaryLight,
  '--color-primary-dark': COLORS.primaryDark,
  '--color-bg-main': COLORS.bgMain,
  '--color-bg-card': COLORS.bgCard,
  '--color-text-primary': COLORS.textPrimary,
  '--color-text-secondary': COLORS.textSecondary,
  '--color-border': COLORS.border,
} as const
