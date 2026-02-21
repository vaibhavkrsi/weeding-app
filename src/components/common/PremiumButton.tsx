import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface PremiumButtonProps {
    onPress: () => void;
    children: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
    onPress,
    children,
    variant = 'primary',
    disabled = false,
    loading = false,
    style,
}) => {
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'primary' && styles.primary,
                variant === 'ghost' && styles.ghost,
                (disabled || loading) && styles.disabled,
                style,
            ]}
            onPress={handlePress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <Text style={[
                    styles.text,
                    variant === 'ghost' && styles.ghostText,
                ]}>
                    {children}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        shadowColor: '#E91E63',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    primary: {
        backgroundColor: '#E91E63',
    },
    ghost: {
        backgroundColor: 'rgba(0,0,0,0.03)',
        shadowOpacity: 0,
        elevation: 0,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    ghostText: {
        color: '#E91E63',
    },
});
