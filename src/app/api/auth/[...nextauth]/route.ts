

import NextAuth, { type AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      // The credentials object now includes all the new sign-up fields
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        fullName: { label: "Full Name", type: "text" },
        username: { label: "Username", type: "text" },
        phone: { label: "Phone", type: "text" },
        college: { label: "College", type: "text" },
        branch: { label: "Branch", type: "text" },
        year: { label: "Year", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        // Find an existing user by their email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // --- SIGN-UP LOGIC ---
        // If the user does not exist, we create a new account with all the details
        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              fullName: credentials.fullName,
              username: credentials.username,
              phone: credentials.phone,
              college: credentials.college,
              branch: credentials.branch,
              year: credentials.year,
            },
          });
          return newUser;
        }

        // --- LOGIN LOGIC ---
        // If the user exists, we just check their password
        if (!user.password) {
          throw new Error("This user does not have a password set.");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };