import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PhotoCardProps {
    title: string;
    subtitle?: string;
    onPress: () => void;
    isSelected?: boolean;
    imageUri?: string;
    gradientColors?: readonly string[];
    icon?: string;
    actionText?: string;
}

export function PhotoCard({
    title,
    subtitle,
    onPress,
    isSelected = false,
    imageUri,
    gradientColors = ['transparent', 'rgba(0,0,0,0.8)'],
    actionText,
}: PhotoCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, isSelected && styles.selected]}
            activeOpacity={0.9}
        >
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                />
            )}
            <LinearGradient
                colors={gradientColors as any}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                {actionText && (
                    <Text style={styles.actionText}>{actionText}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        borderRadius: 24,
        marginBottom: 16,
        overflow: 'hidden',
        backgroundColor: '#1C1C1E', // Slightly lighter than background
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    selected: {
        borderWidth: 3,
        borderColor: '#E91E63',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 4,
        fontWeight: '500',
    },
    actionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E91E63',
        marginTop: 12,
    },
});
