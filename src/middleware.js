import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Validate the token and extract payload
    const { payload } = await jwtVerify(token, secret);

    console.log("Token payload:", payload);

    // Add user info (e.g., username) to response headers for client-side usage
    const response = NextResponse.next();
    response.headers.set("x-username", payload.username || "Guest");

    return response;
  } catch (error) {
    console.error("JWT validation failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/main/:path*"], // Protect all routes under /main
};
