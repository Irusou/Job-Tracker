import { createContext } from 'react';

export interface User {
	id: number;
	email: string;
	username: string;
}

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (user: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
