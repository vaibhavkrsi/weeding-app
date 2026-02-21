import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeddingTypeScreen from '../screens/customer/WeddingTypeScreen';
import ExtraServicesScreen from '../screens/customer/ExtraServicesScreen';
import PlannerDecisionScreen from '../screens/customer/PlannerDecisionScreen';

const Stack = createNativeStackNavigator();

export default function CustomerNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WeddingType" component={WeddingTypeScreen} />
            <Stack.Screen name="ExtraServices" component={ExtraServicesScreen} />
            <Stack.Screen name="PlannerDecision" component={PlannerDecisionScreen} />
        </Stack.Navigator>
    );
}
