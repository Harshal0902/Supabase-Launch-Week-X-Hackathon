import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PentHouse from '@/components/escape-room/PentHouse'

export default async function Page() {

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

    if (!user) {
        redirect('/log-in');
    }

    const userId = `user_${user.id}`;

    return (
        <MaxWidthWrapper>
            <PentHouse userId={userId} />
        </MaxWidthWrapper>
    )
}
