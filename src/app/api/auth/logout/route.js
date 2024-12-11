// pages/api/logout.js or a similar file
export async function POST(req) {
    const headers = new Headers();
  
    // Set the cookie with an expiration date in the past to delete it
    headers.append('Set-Cookie', 'token=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Strict');
  
    return new Response(
      JSON.stringify({ message: 'Logged out successfully' }),
      { status: 200, headers }
    );
  }
  