import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, shadows } from '../../theme/colors';

interface PremiumCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'default' | 'elevated' | 'outlined';
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
    children,
    style,
    variant = 'default'
}) => {
    return (
        <View style={[
            styles.card,
            variant === 'elevated' && styles.elevated,
            variant === 'outlined' && styles.outlined,
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.l,
        padding: 16,
    },
    elevated: {
        ...shadows.medium,
        borderWidth: 0,
    },
    outlined: {
        borderWidth: 1,
        borderColor: colors.border,
    },
});
