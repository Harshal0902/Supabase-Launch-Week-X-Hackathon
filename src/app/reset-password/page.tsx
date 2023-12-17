import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ResetPassword from '@/components/auth/ResetPassword'

export default async function ResetPasswordPage() {

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

    return <ResetPassword />;
}
