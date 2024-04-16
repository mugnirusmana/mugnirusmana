/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile-md': '380px',
      'mobile-lg': '420px',
      'tablet': '640px',
      'tablet-md': '820px',
      'tablet-lg': '900px',
      'desktop': '1025px',
    },
    extend: {
      colors: {
        'light-pink': '#FBE4F5',
        'medium-pink': '#FFCDF2',
        'normal-pink': '#FF99E4',
        'dark-pink': '#9F5A8D',
      },
      rotate: {
        '25': '25deg',
        '30': '30deg',
        '190': '190deg',
        '205': '205deg',
        '210': '210deg',
      },
      fontFamily: {
        "anek-telugu": ['Anek Telugu'],
        "ballet": ['Ballet', 'cursive'],
        "dancing-script": ['Dancing Script', 'cursive'],
        "estonia": ['Estonia', 'cursive'],
        "imperial-script": ['Imperial Script', 'cursive'],
        "ingrid-darling": ['Ingrid Darling', 'cursive'],
        "island-moment": ['Island Moments', 'cursive'],
        "puppies": ['Puppies Play', 'cursive'],
        "ruluko": ['Ruluko', 'sans-serif'],
        "satisfy": ['Satisfy', 'cursive'],
        "whisper": ['Whisper', 'cursive'],
      },
      keyframes: {
        flying: {
          '0%': {
            opacity: 0,
            transform: 'translateY(0%)',
          },
          '50%': {
            opacity: 1,
          },
          '90%': {
            opacity: 0,
          },
          '91%': {
            opacity: 0,
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(0%)',
          },
        },
        blinking: {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        expanding: {
          '0%': {
            transform: 'scaleX(1)',
          },
          '60%': {
            transform: 'scaleX(1.2)',
          },
          '100%': {
            transform: 'scaleX(1)',
          }
        }
      },
      animation: {
        fly: 'flying 2s linear infinite',
      },
    }
  },
  plugins: [],
}
