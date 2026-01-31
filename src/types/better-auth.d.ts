// types/better-auth.d.ts
import "better-auth";

declare module "better-auth" {
    interface User {
        role?: string; // Add role to User type
    }
}

declare module "better-auth/react" {
    interface User {
        role?: string; // Also add to react types
    }
}