'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        {/* 👇 This was a <p> tag, now it's a <div> for valid HTML */}
        <div className="text-sm text-primary-foreground/80 hidden sm:block"> 
          Signed in as {session.user?.email}
        </div>
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          variant="destructive"
          className="shadow-lg hover:shadow-xl transition-all"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login" passHref>
      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base font-semibold">
        Login
      </Button>
    </Link>
  );
}