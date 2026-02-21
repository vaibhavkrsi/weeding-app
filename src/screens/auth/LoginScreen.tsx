import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { ModernInput } from '../../components/common/ModernInput';
import { PremiumButton } from '../../components/common/PremiumButton';

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth`;

export default function LoginScreen() {
    const { login, role } = useAuthStore();
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const endpoint = isRegistering ? '/register' : '/login';
            const payload = isRegistering
                ? { name, email, password, role }
                : { email, password, role };

            const response = await axios.post(`${API_URL}${endpoint}`, payload);

            if (isRegistering) {
                Alert.alert('Success', 'Account created! Please login.');
                setIsRegistering(false);
            } else {
                const { token, user } = response.data;
                await login(token, user);
            }
        } catch (error: any) {
            console.error('Auth Error:', error.response?.data || error.message);
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>{role} {isRegistering ? 'Sign Up' : 'Login'}</Text>
                    <Text style={styles.subtitle}>
                        Welcome to your wedding planner.{"\n"}Let's make your special day perfect.
                    </Text>
                </View>

                <View style={styles.form}>
                    {isRegistering && (
                        <ModernInput
                            label="Full Name"
                            value={name}
                            onChangeText={setName}
                            placeholder="Your Name"
                            leftIcon="👤"
                        />
                    )}
                    <ModernInput
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="yourname@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        leftIcon="✉️"
                    />
                    <ModernInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                        leftIcon="🔒"
                    />

                    <PremiumButton
                        onPress={handleAuth}
                        disabled={loading}
                        loading={loading}
                        style={styles.loginButton}
                    >
                        {isRegistering ? 'Sign Up' : 'Log In'}
                    </PremiumButton>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <PremiumButton
                        variant="ghost"
                        onPress={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                    </PremiumButton>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>❤️ PURE ELEGANCE ❤️</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFBFA',
    },
    navBar: {
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: '#27272A',
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 16,
        fontFamily: 'System',
    },
    subtitle: {
        fontSize: 18,
        color: '#71717A',
        lineHeight: 26,
        fontWeight: '500',
    },
    form: {
        marginTop: 10,
    },
    loginButton: {
        marginTop: 16,
        marginBottom: 24,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    dividerText: {
        paddingHorizontal: 16,
        color: '#A1A1AA',
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 24,
    },
    footerText: {
        color: '#A1A1AA',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});
