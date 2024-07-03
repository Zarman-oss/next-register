'use client';
import { RotateCwIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  type: 'register' | 'login';
};

export default function Form({ type }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    if (type === 'login') {
      signIn('credentials', {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        redirect: false,
        //@ts-ignore
      }).then(({ error }) => {
        if (error) {
          setIsLoading(false);
          toast.error(error);
        } else {
          router.refresh();
          router.push('/protected');
        }
      });
    } else {
      fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
        }),
      }).then(async (response) => {
        if (response.status === 200) {
          toast.success('Account created ');
          setTimeout(() => {
            router.push('/login');
          }, 500);
          setIsLoading(false);
        } else {
          const { error } = await response.json();
          toast.error(error);
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex flex-col space-y-4 px-4 py-8 sm:px-18  "
    >
      <div>
        <label htmlFor="email" className="block text-md text-white uppercase">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="username@domain.com"
          autoComplete="off"
          className="text-black mt-1 block w-full appearance-none  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-md text-white uppercase">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="text-black mt-1 block w-full appearance-none  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        disabled={isLoading}
        className={`${
          isLoading
            ? 'cursor-not-allowed bg-white'
            : 'bg-white hover:bg-gray-300'
        }  flex h-10 w-full items-center justify-center rounded-md border text-lg text-black transition-colors focus:outline-none  bg-white hover:bg-gray-300`}
      >
        {isLoading ? (
          <RotateCwIcon className="animate-spin" />
        ) : (
          <span>{type === 'login' ? 'Login In ' : 'Register'}</span>
        )}
      </button>

      {type === 'login' ? (
        <p className="text-center text-sm text-white">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-white">
            Register
          </Link>{' '}
          {''}
          for free 99.
        </p>
      ) : (
        <p className="text-center text-sm text-white">
          Already have an account? {''}
          <Link href="/login" className="font-semibold text-white">
            Log in
          </Link>{' '}
          instead
        </p>
      )}
    </form>
  );
}
