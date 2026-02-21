import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { StatusBar } from 'expo-status-bar';
import { PhotoCard } from '../../components/common/PhotoCard';
import { colors } from '../../theme/colors';

export default function HomeScreen() {
    const { user, role } = useAuthStore();

    if (role === 'Customer') {
        return <CustomerDashboard user={user} />;
    } else {
        return <PlannerDashboard user={user} />;
    }
}

const CustomerDashboard = ({ user }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.navHeader}>
                <Text style={styles.timeText}>9:41</Text>
                <View style={styles.navIcons}>
                    <Text style={styles.navIconText}>📡 🔋</Text>
                    <View style={styles.moonCircle}>
                        <Text style={styles.moonIcon}>🌙</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>Hello, {user?.name || 'Sarah'}</Text>
                    <Text style={styles.subtitle}>Let's plan your perfect wedding</Text>
                </View>

                {/* Planning Progress */}
                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <View style={styles.checkCircle}>
                            <Text style={styles.checkIcon}>✔️</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.progressTitle}>Planning Progress</Text>
                        </View>
                        <View style={styles.percentBadge}>
                            <Text style={styles.percentText}>30% Complete</Text>
                        </View>
                    </View>

                    <View style={styles.progressBarWrapper}>
                        <View style={styles.progressBarBackground} />
                        <View style={[styles.progressBarFill, { width: '30%' }]} />
                    </View>

                    <View style={styles.progressFooter}>
                        <Text style={styles.progressFooterText}>ENGAGEMENT</Text>
                        <Text style={styles.progressFooterText}>BIG DAY</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
                    <View style={styles.grid}>
                        <TouchableOpacity style={styles.quickCard}>
                            <View style={styles.quickIconWrapper}>
                                <Text style={styles.quickIcon}>📅</Text>
                            </View>
                            <Text style={styles.quickTitle}>Set Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quickCard}>
                            <View style={styles.quickIconWrapper}>
                                <Text style={styles.quickIcon}>👥</Text>
                            </View>
                            <Text style={styles.quickTitle}>Guest List</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recommended Services */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>RECOMMENDED FOR YOU</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        <View style={styles.horizontalCardWrapper}>
                            <PhotoCard
                                title="The Grand Ballroom"
                                subtitle="Villa Elegance"
                                imageUri="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"
                                onPress={() => { }}
                            />
                        </View>
                        <View style={styles.horizontalCardWrapper}>
                            <PhotoCard
                                title="Crystal Garden"
                                subtitle="Modern Venue"
                                imageUri="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
                                onPress={() => { }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const PlannerDashboard = ({ user }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ padding: 24, fontSize: 18 }}>Planner Dashboard - Coming soon to Pure Elegance</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    navHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    navIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    navIconText: {
        fontSize: 14,
        color: colors.text,
    },
    moonCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    moonIcon: {
        fontSize: 18,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
    },
    greeting: {
        fontSize: 42,
        fontWeight: 'bold',
        color: colors.text,
        fontFamily: 'System',
    },
    subtitle: {
        fontSize: 18,
        color: colors.mutedForeground,
        fontWeight: '500',
        marginTop: 4,
    },
    progressCard: {
        backgroundColor: colors.surface,
        borderRadius: 32,
        marginHorizontal: 24,
        padding: 24,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    progressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    checkIcon: {
        fontSize: 18,
        color: '#E91E63',
    },
    progressTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
    },
    percentBadge: {
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
    },
    percentText: {
        color: '#E91E63',
        fontSize: 14,
        fontWeight: 'bold',
    },
    progressBarWrapper: {
        height: 8,
        marginBottom: 16,
        position: 'relative',
    },
    progressBarBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.border,
        borderRadius: 4,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#E91E63',
        borderRadius: 4,
    },
    progressFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressFooterText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#A1A1AA',
        letterSpacing: 1,
    },
    section: {
        marginTop: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.mutedForeground,
        letterSpacing: 1.5,
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    viewAll: {
        color: '#E91E63',
        fontWeight: 'bold',
        fontSize: 14,
    },
    grid: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 20,
    },
    quickCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 32,
        padding: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    quickIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    quickIcon: {
        fontSize: 28,
    },
    quickTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    horizontalScroll: {
        paddingLeft: 24,
    },
    horizontalCardWrapper: {
        width: 280,
        marginRight: 20,
    },
});
