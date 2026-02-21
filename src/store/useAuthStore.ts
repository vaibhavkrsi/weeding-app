import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type UserRole = 'Customer' | 'Planner' | null;

interface AuthState {
    token: string | null;
    user: any | null;
    role: UserRole;
    isLoading: boolean;
    login: (token: string, user: any) => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
    setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    role: null,
    isLoading: true,

    setRole: (role) => set({ role }),

    login: async (token, user) => {
        await SecureStore.setItemAsync('token', token);
        // Persist user role/info if needed or fetch on load
        set({ token, user, role: user.role, isLoading: false });
    },

    logout: async () => {
        await SecureStore.deleteItemAsync('token');
        set({ token: null, user: null, role: null, isLoading: false });
    },

    restoreSession: async () => {
        // Fail-safe to ensure we don't hang forever
        const timeout = setTimeout(() => {
            console.warn('[AuthStore] Session restore timed out - forcing loading to false');
            set({ isLoading: false });
        }, 3000);

        try {
            console.log('[AuthStore] Restoring session...');
            set({ isLoading: true });
            const token = await SecureStore.getItemAsync('token');
            console.log('[AuthStore] Token found:', !!token);

            if (token) {
                set({ token, isLoading: false });
            } else {
                set({ token: null, isLoading: false });
            }
        } catch (error) {
            console.error('[AuthStore] Session restore failed:', error);
            set({ token: null, isLoading: false });
        } finally {
            clearTimeout(timeout);
        }
    },
}));
