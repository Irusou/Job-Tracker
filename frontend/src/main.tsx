import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from '@/components/ui/provider';
import AuthProvider from './context/AuthProvider';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</Provider>
	</StrictMode>,
);
