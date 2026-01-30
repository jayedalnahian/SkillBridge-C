

import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

export const handleGoogleLogin = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL:env.NEXT_PUBLIC_FRONTEND_URL
    });

}
