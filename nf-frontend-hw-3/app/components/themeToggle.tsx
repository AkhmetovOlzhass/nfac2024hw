import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('ThemeToggle must be used within a ThemeProvider');
    }

    const { toggleTheme } = context;

    return (
        <button onClick={toggleTheme}>Toggle Theme</button>
    );
};

export default ThemeToggle;