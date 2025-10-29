"use client";
import {zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; 
import {useForm } from "react-hook-form"; 
import { toast } from "sonner"; 
import { z } from "zod";
import {Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, Form} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { mdiGoogle } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const isPending = form.formState.isSubmitting;

    const onSubmit = async (values: LoginFormValues) => {
        const {email, password} = values;
        await signIn.email({
            email: email,
            password: password,
            callbackURL: '/',
            fetchOptions: {
                onSuccess: () => {
                    router.push('/');
                    toast.success("Logged in successfully");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                }
            }

        })
    }

    const onGoogleSignIn = async () => {
        await signIn.social({
            provider: 'google',
            callbackURL: '/',
            fetchOptions: {
                onSuccess: () => {
                    router.push('/');
                    toast.success("Logged in successfully");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                }
            }
        })
    }
    return (
        <div className="flex flex-col gap-6 w-full h-screen items-center justify-center">
            <Card className="w-xl">
            <CardHeader className="text-center">
                <CardTitle>Welcome back, Login to continue</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={onGoogleSignIn} variant="outline" className="w-full mb-4 flex items-center justify-center gap-2">
                     Sign in with Google
                    <Icon path={mdiGoogle} />
                </Button>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="email" render={(
                        ({field}) => (
                        <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} placeholder="user@mail.com" />
                            </FormControl>
                        </FormItem>
                        )
                    )} />
                    <FormField control={form.control} name="password" render={(
                        ({field}) => (
                        <FormItem>
                            <FormLabel>Password:</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} placeholder="12334535dS#" />
                            </FormControl>
                        </FormItem>
                        )
                    )} />
                    <Button type="submit" disabled={isPending} className="w-full mt-4">
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                    </form>
                </Form>
                <div className="flex justify-center items-center gap-2 mt-5"><span className="text-sm text-muted-foreground">Don&apos;t have an account?</span> <Link className="text-primary underline" href="/sign-up">Sign up</Link></div>
            </CardContent>
        </Card>
        </div>
    );
}

export {LoginForm};