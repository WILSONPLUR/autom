import {betterAuth} from "better-auth";
import prisma from "./db";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        tiktok: { 
            clientSecret: process.env.TIKTOK_CLIENT_SECRET as string, 
            clientKey: process.env.TIKTOK_CLIENT_KEY as string, 
        },
        facebook: { 
            clientId: process.env.FACEBOOK_CLIENT_ID as string, 
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string, 
        }, 
    }
})