import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface NewUser {
    userId: string;
    email: string;
}

export const addNewUser = async ({ userId, email }: NewUser) => {
    try {
        // Check if the user already exists
        const { data: existingUsers, error: checkError } = await supabase
            .from('users')
            .select('user_id')
            .eq('user_id', userId);

        if (checkError) {
            throw new Error('Error checking for existing user');
        }

        if (existingUsers && existingUsers.length > 0) {
            return new Response('User already exists', { status: 200 });
        }

        // Insert the new user
        const { data, error: insertError } = await supabase
            .from('users')
            .upsert([
                {
                    user_id: userId,
                    email: email
                    // Add other fields if needed
                }
            ]);

        if (insertError) {
            throw new Error('Error inserting a new user');
        }

        return data;
    } catch (error) {
        console.error('Error adding a new user', error);
        return new Response('Error adding a new user', { status: 500 });
    }
};