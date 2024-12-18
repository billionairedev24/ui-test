"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import {Customer, Role} from "@/types/types";


interface AuthState {
    customer: Customer | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => Promise<void>;
    triggerLogin: () => void;
}

export const useAuth = (): AuthState => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        if(customer){
            return
        }
        try {
            const response = await axios.get('/api/v1/customer/me', {
                withCredentials: true
            });
            if(response.status == 200){
                const data: Customer = response.data
                setCustomer(data);
                setIsAuthenticated(true);
                //data.role === Role.CUSTOMER  ? window.location.href = "/" : window.location.href = "/dashboard";
            }
        } catch (error) {
            setCustomer(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await axios.post('/logout', {}, { withCredentials: true });
            setCustomer(null);
            setIsAuthenticated(false);
            // Redirect to auth server logout
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    const triggerLogin = () => {
        // Redirect to the auth server's login endpoint
        window.location.href = '/';
    };

    return {
        customer,
        isAuthenticated,
        isLoading,
        logout,
        triggerLogin
    };
};