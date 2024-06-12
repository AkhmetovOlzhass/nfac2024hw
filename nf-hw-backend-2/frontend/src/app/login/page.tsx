'use client'

import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

const LoginPage: React.FC = () => {


    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth();

    const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(email, password);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>

                <Link href="/register">Все ещё нет аккаунта? Зарегестрируйся!</Link>
            </form>
        </>
    );
};

export default LoginPage;