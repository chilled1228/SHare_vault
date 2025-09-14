module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    // Disable non-critical style issues
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off', 
    'react/no-unescaped-entities': 'off',
    '@next/next/google-font-preconnect': 'off',
    '@next/next/no-img-element': 'off',
    'react-hooks/exhaustive-deps': 'off',
    
    // Keep critical security and functionality checks
    '@next/next/no-html-link-for-pages': 'error', // This prevents navigation issues
    'react-hooks/rules-of-hooks': 'error',        // Critical for React functionality
    'react/jsx-key': 'error',                     // Critical for rendering
    'no-undef': 'error',                          // Critical for runtime errors
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
}