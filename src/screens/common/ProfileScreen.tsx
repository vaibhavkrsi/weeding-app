import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { User as UserIcon } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function ProfileScreen() {
    const { user, role, logout } = useAuthStore();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = async () => {
        setShowLogoutModal(false);
        await logout();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={[colors.background, '#18181B']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarIconWrapper}>
                                <UserIcon size={64} color="#FFFFFF" strokeWidth={1.5} />
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.editIcon}>✏️</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.name}>{user?.name || 'test'}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{role?.toUpperCase() || 'CUSTOMER'}</Text>
                        </View>
                    </View>

                    {/* User Details Card */}
                    <View style={styles.glassCard}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Email</Text>
                            <Text style={styles.detailValue}>{user?.email || 'test@gmail.com'}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Role</Text>
                            <Text style={styles.detailValue}>{role || 'Customer'}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Member Since</Text>
                            <Text style={styles.detailValue}>Feb 2026</Text>
                        </View>
                    </View>

                    {/* Menu Items */}
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuIconWrapper}>
                                <Text style={styles.menuIcon}>⚙️</Text>
                            </View>
                            <Text style={styles.menuText}>Edit Preferences</Text>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuIconWrapper}>
                                <Text style={styles.menuIcon}>🔔</Text>
                            </View>
                            <Text style={styles.menuText}>Notifications</Text>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, styles.logoutItem]}
                            onPress={() => setShowLogoutModal(true)}
                        >
                            <View style={[styles.menuIconWrapper, styles.logoutIconWrapper]}>
                                <Text style={styles.menuIcon}>🚪</Text>
                            </View>
                            <Text style={[styles.menuText, styles.logoutText]}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* Logout Modal */}
            <Modal
                visible={showLogoutModal}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sign Out?</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to sign out?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowLogoutModal(false)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.confirmText}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    avatarIconWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#1A1A1A',
    },
    editIcon: {
        fontSize: 14,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
        fontFamily: 'System',
    },
    badge: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#E91E63',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    glassCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    detailLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
    },
    detailValue: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 4,
    },
    menuContainer: {
        gap: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 16,
        borderRadius: 20,
    },
    menuIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuIcon: {
        fontSize: 18,
    },
    menuText: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    chevron: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 24,
    },
    logoutItem: {
        marginTop: 16,
    },
    logoutIconWrapper: {
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
    },
    logoutText: {
        color: '#E91E63',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        padding: 40,
    },
    modalContent: {
        backgroundColor: '#2D2D2D',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    modalMessage: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        marginBottom: 32,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 16,
    },
    modalButton: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    confirmButton: {
        backgroundColor: '#E91E63',
    },
    cancelText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    confirmText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
