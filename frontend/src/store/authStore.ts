import { fetchMe } from '@/api/fetch-me';
import { create } from 'zustand';

export type User = {
	id: number;
	email: string;
	username: string;
};

type AuthState = {
	user: User | null;
	loading: boolean;
	checkAuth: () => Promise<void>;
	login: (user: User) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	loading: true,

	login: async (user: User) => set({ user }),
	logout: async () => set({ user: null }),
	checkAuth: async () => {
		try {
			const user = await fetchMe();
			if (!user) throw null;
			set({ user });
		} catch {
			set({ user: null });
		} finally {
			set({ loading: false });
		}
	},
}));
