/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                DynaPuff: ['DynaPuff', 'cursive'],
            },
            keyframes: {
                bgAnimate: {
                    '0%, 100%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                },
                text: {
                    '0%, 100%': {
                        backgroundSize: '200% 200%',
                        backgroundPosition: 'left center',
                    },
                    '50%': {
                        backgroundSize: '200% 200%',
                        backgroundPosition: 'right center',
                    },
                },
            },
            animation: {
                'bg-animate': 'bgAnimate 3s ease infinite',
                text: 'text 5s ease infinite',
            },
            backgroundSize: {
                '400%': '400%',
            },
            colors: {
                white: '#ffffff',
                gray: {
                    900: '#111827',
                    800: '#1F2937',
                    700: '#374151',
                    600: '#4B5563',
                    500: '#6B7280',
                    400: '#9CA3AF',
                    300: '#D1D5DB',
                    200: '#E5E7EB',
                    100: '#F3F4F6',
                    50: '#F9FAFB',
                },
                'radical-red': {
                    900: '#B8001F',
                    800: '#D60024',
                    700: '#F50029',
                    600: '#FF143C',
                    500: '#FF3355',
                    400: '#FF5C77',
                    300: '#FF8599',
                    200: '#FFC2CC',
                    100: '#FFD6DD',
                    50: '#FFEBEE',
                },
                'prussian-blue': {
                    900: '#00143D',
                    800: '#001847',
                    700: '#001B52',
                    600: '#001F5C',
                    500: '#002266',
                    400: '#003DB8',
                    300: '#3377FF',
                    200: '#85ADFF',
                    100: '#ADC9FF',
                    50: '#D6E4FF',
                },
                red: {
                    900: '#7F1D1D',
                    800: '#991B1B',
                    700: '#B91C1C',
                    600: '#DC2626',
                    500: '#EF4444',
                    400: '#F87171',
                    300: '#FCA5A5',
                    200: '#FECACA',
                    100: '#FEE2E2',
                    50: '#FEF2F2',
                },
                green: {
                    900: '#064E3B',
                    800: '#065F46',
                    700: '#047857',
                    600: '#059669',
                    500: '#10B981',
                    400: '#34D399',
                    300: '#6EE7B7',
                    200: '#A7F3D0',
                    100: '#D1FAE5',
                    50: '#ECFDF5',
                },
                teal: {
                    900: '#134E4A',
                    800: '#115E59',
                    700: '#0F766E',
                    600: '#0D9488',
                    500: '#14B8A6',
                    400: '#2DD4BF',
                    300: '#5EEAD4',
                    200: '#99F6E4',
                    100: '#CCFBF1',
                    50: '#F0FDFA',
                },
                blue: {
                    900: '#1E3A8A',
                    800: '#1E40AF',
                    700: '#1D4ED8',
                    600: '#2563EB',
                    500: '#3B82F6',
                    400: '#60A5FA',
                    300: '#93C5FD',
                    200: '#BFDBFE',
                    100: '#DBEAFE',
                    50: '#EFF6FF',
                },
                yellow: {
                    900: '#78350F',
                    800: '#92400E',
                    700: '#B45309',
                    600: '#D97706',
                    500: '#F59E0B',
                    400: '#FBBF24',
                    300: '#FCD34D',
                    200: '#FDE68A',
                    100: '#FEF3C7',
                    50: '#FFFBEB',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
}
