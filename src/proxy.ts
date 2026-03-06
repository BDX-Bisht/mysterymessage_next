import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    // Must pass secret explicitly - env vars may not be available in Proxy context
    // secureCookie: false on localhost (HTTP) - must match NextAuth's useSecureCookies
    const isSecure =
        process.env.NEXTAUTH_URL?.startsWith("https") ?? false;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: isSecure,
    });

    const url = request.nextUrl;

    console.log(token);

    if (
        token &&
        (url.pathname.startsWith("/sign-in") ||
            url.pathname.startsWith("/sign-up") ||
            url.pathname.startsWith("/verify") ||
            url.pathname.startsWith("/"))
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.redirect(new URL("/home", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        "/signin",
        "/sign-up",
        "/",
        "/verify/:path*",
        "/dashboard/:path*",
    ],
};
