import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { PhotoCard } from '../../components/common/PhotoCard';
import { StatusBar } from 'expo-status-bar';

export default function RoleSelectionScreen() {
    const setRole = useAuthStore(state => state.setRole);
    const navigation = useNavigation<any>();

    const handleSelect = (role: 'Customer' | 'Planner') => {
        setRole(role);
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.titlePrefix}>Welcome to</Text>
                    <Text style={styles.titleHighlight}>Wedding Planner</Text>
                    <Text style={styles.question}>WHO ARE YOU?</Text>
                </View>

                <View style={styles.content}>
                    <PhotoCard
                        title="I'm a Customer"
                        subtitle="I want to plan my dream wedding"
                        imageUri="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        onPress={() => handleSelect('Customer')}
                        actionText="Get Started →"
                    />

                    <PhotoCard
                        title="I'm a Wedding Planner"
                        subtitle="I want to find new clients"
                        imageUri="https://images.unsplash.com/photo-1727430813324-ff0d017324c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        onPress={() => handleSelect('Planner')}
                        actionText="Join as Professional →"
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 32,
    },
    heartCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: colors.border,
    },
    heartIcon: {
        fontSize: 24,
    },
    titlePrefix: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    titleHighlight: {
        fontSize: 42,
        fontWeight: 'bold',
        color: colors.primary,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: -4,
    },
    question: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1.5,
        color: colors.mutedForeground,
        marginTop: 20,
    },
    content: {
        paddingHorizontal: 24,
        gap: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
        paddingBottom: 24,
    },
    footerText: {
        color: colors.mutedForeground,
        fontSize: 16,
    },
    loginLink: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
