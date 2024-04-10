'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="text-white  hover:text-gray-300 transition-colors flex items-center space-x-1  "
    >
      <LogOut className="w-16 h-16" />
      <span>Sign Out</span>
    </button>
  );
}
