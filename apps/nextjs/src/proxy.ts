import { type NextRequest, NextResponse } from 'next/server';
import { signUpAnonymousUser } from '@/lib/firebase/auth/anonymous-signup';
import { TOKEN_COOKIE_NAME } from '@/lib/firebase/auth/const';
import { getExpiredAt } from '@/lib/firebase/auth/get-expired-at';
import type { StoredToken } from '@/lib/firebase/auth/types';

export async function proxy(request: NextRequest) {
  const raw = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  if (raw) {
    try {
      const stored = JSON.parse(raw) as StoredToken;
      if (stored.idToken && stored.refreshToken) {
        return NextResponse.next();
      }
    } catch {}
  }

  try {
    const { idToken, refreshToken, expiresIn } = await signUpAnonymousUser();
    const expiresAt = getExpiredAt(expiresIn);

    const response = NextResponse.next();
    response.cookies.set(
      TOKEN_COOKIE_NAME,
      JSON.stringify({
        idToken,
        refreshToken,
        expiresAt,
      } satisfies StoredToken),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      },
    );
    return response;
  } catch (err) {
    console.error('[proxy] Failed to create anonymous user:', err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|manifest\\.json|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf)$).*)',
  ],
};
