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
import { signIn, signUp } from "@/lib/auth-client";
import {Icon} from "@mdi/react";
import { mdiGoogle } from '@mdi/js'; 

const registerSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const router = useRouter();
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const isPending = form.formState.isSubmitting;

    const onSubmit = async (values: RegisterFormValues) => {
        const {email, password} = values;
            await signUp.email({
                email: email,
                password: password,
                name: email,
                callbackURL: '/',
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/');
                        toast.success("Account created successfully");
                    },
                    onError: (error) => {
                        toast.error("Something went wrong: " + error);
                        console.log(error);
                    }
                }
            });
    }
    const onGoogleSignUp = async () => {
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
                <CardTitle>Register new account</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={onGoogleSignUp} variant="outline" className="w-full mb-4 flex items-center justify-center gap-2">
                           Sign up with Google
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
                    <FormField control={form.control} name="confirmPassword" render={(
                        ({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password:</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} placeholder="********" />
                            </FormControl>
                        </FormItem>
                        )
                    )} />
                    <Button type="submit" disabled={isPending} className="w-full mt-4">
                        {isPending ? "Loading..." : "Sign Up"}
                    </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </div>
    );
}

export {RegisterForm};