import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
} from 'react-native';

interface ModernInputProps extends Omit<TextInputProps, 'style'> {
    label: string;
    error?: string;
    leftIcon?: string | React.ReactNode;
    rightIcon?: string | React.ReactNode;
}

export const ModernInput: React.FC<ModernInputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    ...props
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label.toUpperCase()}</Text>
                {props.secureTextEntry && (
                    <Text style={styles.forgotLink}>Forgot?</Text>
                )}
            </View>
            <View style={[
                styles.inputWrapper,
                error ? styles.inputError : null
            ]}>
                {leftIcon && (
                    <View style={styles.iconContainer}>
                        <Text style={styles.iconText}>{leftIcon}</Text>
                    </View>
                )}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#A1A1AA"
                    {...props}
                />
                {rightIcon && (
                    <View style={styles.iconContainer}>
                        <Text style={styles.iconText}>{rightIcon}</Text>
                    </View>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#71717A',
        letterSpacing: 1.2,
    },
    forgotLink: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#E91E63',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 64,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    inputError: {
        borderColor: '#EF4444',
    },
    iconContainer: {
        marginRight: 12,
        marginLeft: -4,
    },
    iconText: {
        fontSize: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#27272A',
        fontWeight: '500',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
    },
});
