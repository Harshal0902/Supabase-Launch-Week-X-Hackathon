import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Leaderboard from '@/components/Leaderboard'

export default async function page() {
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

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userId = user ? `user_${user.id}` : null;

    return (
        <MaxWidthWrapper>
            <Leaderboard userId={userId} />
        </MaxWidthWrapper>
    )
}
