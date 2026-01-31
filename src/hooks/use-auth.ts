// hooks/use-auth.ts
import { authClient } from "@/lib/auth-client";

interface ExtendedUser {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
    role?: string;
    createdAt: Date;
    updatedAt: Date;
}

export function useAuth() {
    const { data, error } = authClient.useSession();

    return {
        user: data?.user as ExtendedUser | undefined,
        error,
    };
}