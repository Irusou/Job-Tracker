// AuthContext.tsx

import { createContext } from 'react';

export interface User {
	id: number;
	email: string;
	username: string;
}

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
