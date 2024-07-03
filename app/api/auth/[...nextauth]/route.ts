import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          // Ensure password is not undefined
          throw new Error('Missing username or password');
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
          throw new Error('Invalid email or password');
        }

        return user as any;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
