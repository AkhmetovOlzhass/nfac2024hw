import React, { useContext } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/app/context/AuthContext';
import '../app/globals.css';
import Header from '@/app/components/layout/header';
import { ThemeContext, ThemeProvider } from '@/app/context/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppContent>
                    <Component {...pageProps} />
                </AppContent>
            </AuthProvider>
        </ThemeProvider>
    );
}

interface AppContentProps {
    children: React.ReactNode;
}

function AppContent({ children }: AppContentProps) {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useContext(ThemeContext) must be inside a ThemeProvider with a value");
    }
    const { theme } = context;

    return (
        <div className={`${theme}-theme px-40 min-h-screen`}>
            <Header/>
            {children}
        </div>
    );
}
export default MyApp;
