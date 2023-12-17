"use client"

import { createBrowserClient } from '@supabase/ssr'
import { Button } from '../ui/button'

export default function SignOutBtn() {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('ERROR:', error);
        }
    }

    return (
        <Button className='bg-red-500 hover:bg-red-600 cursor-pointer' onClick={handleSignOut}>
            Log Out
        </Button>
    );
}
