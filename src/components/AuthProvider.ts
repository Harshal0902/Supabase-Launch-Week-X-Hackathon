"use client"

import { createContext, ReactNode, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
    accessToken: any;
    children: ReactNode;
}

export const AuthContext = createContext<any>(null);

export default function AuthProvider({ accessToken, children }: AuthProviderProps) {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const router = useRouter();

    useEffect(() => {
        const {
            data: { subscription: authListener },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== accessToken) {
                router.refresh();
            }
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, [accessToken, supabase, router]);

    return children;
};