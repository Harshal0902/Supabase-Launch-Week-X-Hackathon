import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface NewUser {
    userId: string;
    email: string;
}

interface Profile {
    user_auth_id: string;
}

interface UserScore {
    userId: string,
    completedIn: number,
    roomOrEasterEggId: string,
    score: number,
    createdAt: Date
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

export const getUserProfileDetails = async ({ user_auth_id }: Partial<Profile>) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user_auth_id)

        if (error) {
            return new Response('Error fetching new model', { status: 200 });
        }

        return data;
    } catch (error) {
        return new Response('Error adding new model', { status: 500 });
    }
};

export const updateUserProfile = async (userId: string, updates: Partial<any>) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('user_id', userId);

        if (error) {
            console.error('Error updating user profile:', error);
        }

        return data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        return null;
    }
};

export const updateUserScoreProfile = async (userId: string, updates: Partial<any>) => {
    try {
        const { data, error } = await supabase
            .from('users_score')
            .update(updates)
            .eq('user_id', userId);

        if (error) {
            console.error('Error updating user profile:', error);
        }

        return data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        return null;
    }
};

export const insertScore = async (
    userId: string,
    completedIn: number,
    roomOrEasterEggId: string,
    score: number,
    createdAt: Date
) => {
    try {
        const { data: existingScores, error } = await supabase
            .from('users_score')
            .select('id')
            .eq('user_id', userId)
            .eq('room_or_easter_egg_id', roomOrEasterEggId);

        if (!error && (!existingScores || existingScores.length === 0)) {

            const { data, error } = await supabase
                .from('users_score')
                .upsert([
                    {
                        user_id: userId,
                        completed_in: completedIn.toString(),
                        room_or_easter_egg_id: roomOrEasterEggId,
                        score,
                        created_at: createdAt.toISOString(),
                    },
                ]);

            if (!error) {
                // console.log('Score inserted successfully:', data);
            } else {
                console.error('Error inserting score:', error.message);
            }
        } else {
            // console.log('Score already exists for this user and room/easter egg pair.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getScoreDetails = async () => {
    try {
        const { data, error } = await supabase
            .from('users_score')
            .select('*')

        if (error) {
            return new Response('Error fetching score details', { status: 200 });
        }

        return data;
    } catch (error) {
        return new Response('Error fetching score details', { status: 500 });
    }
};