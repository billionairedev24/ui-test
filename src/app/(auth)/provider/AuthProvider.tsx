import { useAuth } from '@/app/hooks/useAuth';
import React, { createContext, ReactNode } from 'react';

export const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};