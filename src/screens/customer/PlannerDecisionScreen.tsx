import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ModernInput } from '../../components/common/ModernInput';
import { PremiumButton } from '../../components/common/PremiumButton';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../theme/colors';

export default function PlannerDecisionScreen() {
    const navigation = useNavigation<any>();
    const [decision, setDecision] = useState<'yes' | 'no' | null>(null);

    const [plannerDetails, setPlannerDetails] = useState({
        name: '',
        email: '',
        phone: '',
        relation: ''
    });

    const handleSubmit = () => {
        if (decision === 'yes') {
            Alert.alert('Success', 'We have assigned a Top Rated planner to you! Check your email.');
        } else {
            if (!plannerDetails.name || !plannerDetails.phone) {
                Alert.alert('Error', 'Please provide planner details.');
                return;
            }
            Alert.alert('Saved', 'Your planner details have been saved.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Need a Wedding Planner?</Text>
                    <Text style={styles.subtitle}>We can assign our best planners to ensure your celebration is flawless.</Text>
                </View>

                <View style={styles.choiceContainer}>
                    <TouchableOpacity
                        style={[styles.choiceBtn, decision === 'yes' && styles.choiceBtnActive]}
                        onPress={() => setDecision('yes')}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.radioOutline, decision === 'yes' && styles.radioActive]}>
                            {decision === 'yes' && <View style={styles.radioInner} />}
                        </View>
                        <Text style={[styles.choiceText, decision === 'yes' && styles.choiceTextActive]}>
                            Yes, I need one
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.choiceBtn, decision === 'no' && styles.choiceBtnActive]}
                        onPress={() => setDecision('no')}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.radioOutline, decision === 'no' && styles.radioActive]}>
                            {decision === 'no' && <View style={styles.radioInner} />}
                        </View>
                        <Text style={[styles.choiceText, decision === 'no' && styles.choiceTextActive]}>
                            No, I have one
                        </Text>
                    </TouchableOpacity>
                </View>

                {decision === 'no' && (
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Planner details</Text>
                        <ModernInput
                            label="Planner Name"
                            value={plannerDetails.name}
                            onChangeText={(t) => setPlannerDetails({ ...plannerDetails, name: t })}
                            placeholder="John Doe"
                        />
                        <ModernInput
                            label="Email Address"
                            value={plannerDetails.email}
                            onChangeText={(t) => setPlannerDetails({ ...plannerDetails, email: t })}
                            keyboardType="email-address"
                            placeholder="john@example.com"
                        />
                        <ModernInput
                            label="Phone Number"
                            value={plannerDetails.phone}
                            onChangeText={(t) => setPlannerDetails({ ...plannerDetails, phone: t })}
                            keyboardType="phone-pad"
                            placeholder="+1 234 567 890"
                        />
                        <ModernInput
                            label="Relation"
                            value={plannerDetails.relation}
                            onChangeText={(t) => setPlannerDetails({ ...plannerDetails, relation: t })}
                            placeholder="e.g. Friend, Relative"
                        />
                    </View>
                )}

                {decision && (
                    <PremiumButton onPress={handleSubmit} style={styles.submitButton}>
                        Continue
                    </PremiumButton>
                )}

                <View style={styles.footerSpacing} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        paddingTop: 40,
        paddingBottom: 32,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        color: colors.mutedForeground,
        lineHeight: 26,
    },
    choiceContainer: {
        gap: 16,
        marginBottom: 40,
    },
    choiceBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.border,
    },
    choiceBtnActive: {
        borderColor: colors.primary,
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
    },
    radioOutline: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D4D4D8',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioActive: {
        borderColor: '#E91E63',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E91E63',
    },
    choiceText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
    },
    choiceTextActive: {
        color: colors.primary,
    },
    formContainer: {
        backgroundColor: colors.surface,
        borderRadius: 32,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 4,
        marginBottom: 32,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 24,
    },
    submitButton: {
        marginTop: 8,
    },
    footerSpacing: {
        height: 40,
    },
});
