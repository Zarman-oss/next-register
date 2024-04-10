import AuthStatus from '@/components/AuthStatus';
import SignOut from '@/components/SignOut';
import Image from 'next/image';
export default function ProtectedPage() {
  return (
    <div h-screen>
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <iframe
          src="https://giphy.com/embed/1267Co3vPNBqQU"
          width="480"
          height="480"
          className="flex m-8 p-8"
          allowFullScreen
        ></iframe>

        <AuthStatus />
        <SignOut />
      </div>
    </div>
  );
}
