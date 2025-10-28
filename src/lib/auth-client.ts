import { polarClient } from "@polar-sh/better-auth"
import { createAuthClient } from "better-auth/react"
export const {signIn, signUp, signOut, customer, checkout} = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [polarClient()],
})