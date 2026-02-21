import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PhotoCard } from '../../components/common/PhotoCard';
import { PremiumButton } from '../../components/common/PremiumButton';
import { colors } from '../../theme/colors';

const EXTRA_SERVICES = [
    {
        id: 'venue',
        title: 'Venue Booking',
        subtitle: 'Premium locations',
        icon: '🏰',
        imageUri: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
    {
        id: 'decoration',
        title: 'Decoration',
        subtitle: 'Floral & themes',
        icon: '🌸',
        imageUri: 'https://images.unsplash.com/photo-1641996250159-9d2bbfb483fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
    {
        id: 'photography',
        title: 'Photography',
        subtitle: 'Professional shoots',
        icon: '📸',
        imageUri: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
    {
        id: 'makeup',
        title: 'Makeup & Styling',
        subtitle: 'Bridal beauty',
        icon: '💄',
        imageUri: 'https://images.unsplash.com/photo-1582576192532-06353147fcbf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
    {
        id: 'catering',
        title: 'Catering',
        subtitle: 'Delicious cuisine',
        icon: '🍽️',
        imageUri: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
    {
        id: 'guest_stay',
        title: 'Guest Stay',
        subtitle: 'Hotel bookings',
        icon: '🏨',
        imageUri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
] as const;

export default function ExtraServicesScreen() {
    const navigation = useNavigation<any>();
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleNext = () => {
        navigation.navigate('PlannerDecision');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Text style={styles.title}>
                    Additional Services
                </Text>
                <Text style={styles.subtitle}>
                    Select all that you need
                </Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {EXTRA_SERVICES.map((service) => (
                    <PhotoCard
                        key={service.id}
                        title={service.title}
                        subtitle={service.subtitle}
                        imageUri={service.imageUri}
                        gradientColors={service.gradientColors}
                        isSelected={selected.includes(service.id)}
                        onPress={() => toggleSelection(service.id)}
                    />
                ))}

                <View style={styles.spacer} />
            </ScrollView>

            <View style={styles.footer}>
                <PremiumButton onPress={handleNext}>
                    {selected.length > 0 ? `Continue (${selected.length} selected)` : 'Continue'}
                </PremiumButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
    },
    subtitle: {
        color: colors.mutedForeground,
        fontSize: 18,
        fontWeight: '500',
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    spacer: {
        height: 40,
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 10,
    },
});
