import { env } from "@/env";
import { cookies } from "next/headers";

export async function getServerSession() {
    const cookieHeader = (await cookies()).toString()

    const res = await fetch(`${env.AUTH_URL}/session`, {
        headers: {
            Cookie: cookieHeader,
        },
        cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();


}