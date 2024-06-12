'use client'

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const { register } = useAuth();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        register(username, email, password);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>

                <Link href="/login">Уже есть аккаунт? Авторизуйся!</Link>
            </form>
        </>
    );
};

export default RegisterPage;