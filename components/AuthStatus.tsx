import { User2 } from 'lucide-react';
import { getServerSession } from 'next-auth';

export default async function AuthStatus() {
  const session = await getServerSession();

  return (
    <div className="absolute top-5 w-full flex justify-end m-8 p-8">
      <User2 className="text-white inline" />
      {session && <p className="text-white text-md">{session.user?.email}</p>}
    </div>
  );
}
