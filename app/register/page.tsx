import { UserPlus2Icon } from 'lucide-react';
import Link from 'next/link';
import Form from '@/components/Form';

export default function page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 w-full max-w-md overflow-hidden">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 pb-5 pt-7 text-center sm:px-15">
          <Link href="/">
            <UserPlus2Icon className="h-12 w-12 text-white" />
          </Link>
          <h3 className="text-xl font-semibold text-white">Register User</h3>
          <p className="text-sm text-white">
            Create an account with your valid email and put a strong password in
          </p>
          <Form type="register" />
        </div>
      </div>
    </div>
  );
}
