import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.BETTER_AUTH_SECRET || 'test-secret-key'
);

// In-memory user storage (replace with DB in production)
const users = new Map();

export async function GET(request) {
  try {
    const cookie = request.cookies.get('auth_token');

    if (!cookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ session: { token: cookie.value } }, { status: 200 });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Sign up
    if (pathname.includes('sign-up')) {
      const body = await request.json();

      if (!body.email || !body.password) {
        return NextResponse.json(
          { error: 'Email and password required' },
          { status: 400 }
        );
      }

      // Check if user already exists
      if (users.has(body.email)) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      // Store user data
      const userId = Date.now().toString();
      users.set(body.email, {
        id: userId,
        email: body.email,
        name: body.name || 'User',
        password: body.password, // In production, hash this!
        photoUrl: body.photoUrl || null,
      });

      // Create JWT token
      const token = await new SignJWT({
        email: body.email,
        id: userId,
        name: body.name || 'User'
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(secret);

      const response = NextResponse.json(
        {
          user: {
            email: body.email,
            id: userId,
            name: body.name || 'User',
            image: body.photoUrl || null
          },
          token
        },
        { status: 200 }
      );

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    // Sign in
    if (pathname.includes('sign-in')) {
      const body = await request.json();

      if (!body.email || !body.password) {
        return NextResponse.json(
          { error: 'Email and password required' },
          { status: 400 }
        );
      }

      const user = users.get(body.email);

      if (!user || user.password !== body.password) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      const token = await new SignJWT({
        email: user.email,
        id: user.id,
        name: user.name
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(secret);

      const response = NextResponse.json(
        {
          user: {
            email: user.email,
            id: user.id,
            name: user.name,
            image: user.photoUrl
          },
          token
        },
        { status: 200 }
      );

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
