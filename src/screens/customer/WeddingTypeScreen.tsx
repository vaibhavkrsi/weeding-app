import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PhotoCard } from '../../components/common/PhotoCard';
import { colors } from '../../theme/colors';

const WEDDING_TYPES = [
    {
        id: 'hindu',
        title: 'Hindu Wedding',
        subtitle: 'Sacred traditional ceremony',
        imageUri: 'https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
    {
        id: 'muslim',
        title: 'Muslim Wedding',
        subtitle: 'Nikah ceremony',
        imageUri: 'https://plus.unsplash.com/premium_photo-1677966145676-8641eb66b942?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
    {
        id: 'christian',
        title: 'Christian Wedding',
        subtitle: 'Church blessing ceremony',
        imageUri: 'https://images.unsplash.com/photo-1708133302586-2ffca3db5553?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
    {
        id: 'buddhist',
        title: 'Buddhist Wedding',
        subtitle: 'Traditional celebration',
        imageUri: 'https://images.unsplash.com/photo-1633081517593-5649d73318af?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        gradientColors: ['transparent', 'rgba(0,0,0,0.8)'] as const
    },
] as const;

export default function WeddingTypeScreen() {
    const navigation = useNavigation<any>();
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelected(id);
        setTimeout(() => {
            navigation.navigate('ExtraServices');
        }, 500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.header}>
                <Text style={styles.title}>
                    What kind of wedding?
                </Text>
                <Text style={styles.subtitle}>
                    Choose your ceremony style
                </Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {WEDDING_TYPES.map((type) => (
                    <PhotoCard
                        key={type.id}
                        title={type.title}
                        subtitle={type.subtitle}
                        imageUri={type.imageUri}
                        gradientColors={type.gradientColors}
                        isSelected={selected === type.id}
                        onPress={() => handleSelect(type.id)}
                    />
                ))}

                <View style={styles.spacer} />
            </ScrollView>
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
        fontFamily: 'System',
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
        paddingBottom: 40,
    },
    spacer: {
        height: 40,
    },
});
