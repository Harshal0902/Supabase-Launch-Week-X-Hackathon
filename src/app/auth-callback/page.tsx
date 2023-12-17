"use client"

import { createBrowserClient } from '@supabase/ssr'
import { useEffect } from 'react'
import { addNewUser } from '@/lib/supabaseRequests'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function Page() {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {

            const { data: { user } } = await supabase.auth.getUser();

            const newUser = {
                userId: `user_${user?.id}`,
                email: user?.email,
            };

            try {
                // @ts-ignore
                const response = await addNewUser(newUser);

                if (response instanceof Response) {
                    console.error('Error:', response.statusText);
                } else {
                    console.log('User added successfully');
                }

                router.push('/escape-rooms');
            } catch (error) {
                // @ts-ignore
                console.error('Error:', error.message);
            }
        };

        fetchUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-8 w-8 animate-spin' />
                <h3 className='font-semibold text-xl'>
                    Setting up your account...
                </h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    )
}
