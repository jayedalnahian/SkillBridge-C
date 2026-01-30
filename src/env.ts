
import * as z from "zod";
import { createEnv } from '@t3-oss/env-nextjs';


export const env = createEnv({
    server: {

        BACKEND_URL: z.url(),

        API_URL: z.url(),
        AUTH_URL: z.url(),
    },
    client: {
        NEXT_PUBLIC_CALLBACK_URL: z.url(),
        NEXT_PUBLIC_FRONTEND_URL: z.url(),
    },
    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,

        API_URL: process.env.API_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_CALLBACK_URL: process.env.NEXT_PUBLIC_CALLBACK_URL,
        NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    }
})