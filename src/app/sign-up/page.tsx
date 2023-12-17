import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import SignUp from '@/components/auth/SignUp';

export default async function SignUpPage() {
    
    const cookieStore = cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
    const { data } = await supabase.auth.getUser();

    if (data?.user) {
        redirect('/escape-rooms');
    }

    return <SignUp />;
}