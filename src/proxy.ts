import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request });

    const url = request.nextUrl;

    if (token) {
        // If authenticated and trying to access auth pages or home, redirect to dashboard
        if (
            url.pathname.startsWith("/sign-in") ||
            url.pathname.startsWith("/sign-up") ||
            url.pathname.startsWith("/verify")
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }
    // If not authenticated and trying to access dashboard, redirect to sign-in
    if (!token && url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // For all other cases, allow the request
    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        "/sign-in",
        "/sign-up",
        "/",
        "/verify/:path*",
        "/dashboard/:path*",
    ],
};
