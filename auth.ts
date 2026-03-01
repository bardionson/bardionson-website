import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Shared NextAuth v4 options — exported so getServerSession can reuse them
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Password",
            credentials: {
                password: { label: "Vault Password", type: "password" },
            },
            async authorize(credentials) {
                const vaultPassword = process.env.MOCK_VAULT_PASSWORD || "password123";

                if (credentials?.password === vaultPassword) {
                    return { id: "1", name: "Collector", email: "collector@example.com" };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/collectors',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "dev-secret-change-me",
};
