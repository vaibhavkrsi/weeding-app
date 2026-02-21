export const colors = {
    primary: '#E91E63', // Vibrant Rose
    primaryForeground: '#FFFFFF',
    background: '#09090B', // Zinc-950
    surface: '#18181B', // Zinc-900
    secondary: '#27272A', // Zinc-800
    secondaryForeground: '#FAFAFA', // Zinc-50
    muted: '#27272A',
    mutedForeground: '#A1A1AA', // Zinc-400
    accent: '#27272A',
    accentForeground: '#FAFAFA',
    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',
    border: '#27272A', // Zinc-800
    input: '#18181B',
    ring: '#E91E63',
    success: '#10B981',
    text: '#FAFAFA', // Zinc-50
} as const;

export const spacing = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
} as const;

export const borderRadius = {
    s: 8,
    m: 12,
    l: 16, // Standard card radius
    xl: 24,
    full: 9999,
} as const;

export const shadows = {
    soft: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    hard: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    }
} as const;

export const typography = {
    header: {
        fontSize: 28,
        fontWeight: '700', // Bold
        color: colors.text,
        letterSpacing: -0.5,
    },
    subheader: {
        fontSize: 20,
        fontWeight: '600', // Semibold
        color: colors.text,
        letterSpacing: -0.25,
    },
    body: {
        fontSize: 16,
        fontWeight: '400', // Regular
        color: colors.text,
        lineHeight: 24,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.mutedForeground,
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        fontWeight: '500', // Medium
        color: colors.mutedForeground,
    },
    button: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primaryForeground,
    },
} as const;
