'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AuthContextType {
    authToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            router.push('/login');
        } else {
            setAuthToken(token);
        }
    }, [router]);

    const register = async (username: string, email: string, password: string): Promise<void> => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/register', {username, email, password });
            console.log(response);
            router.push('/login'); 
        } catch (error) {
            console.error('Register failed:', error);
            alert('Register failed!');
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', { email, password });
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('userName', user.username);
            localStorage.setItem('id', user._id);
            
            
            setAuthToken(accessToken);
            
            router.push('/'); 
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed!');
        }
    };


    const logout = (): void => {
        localStorage.removeItem('token');
        setAuthToken(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};