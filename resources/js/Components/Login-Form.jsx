"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm as useHookForm } from "react-hook-form"
import { z } from "zod"
import { useForm as useInertiaForm } from "@inertiajs/react"
import { Button } from "@/Components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"

// Define the form schema using Zod
const formSchema = z.object({
    email: z.string().email({
        message: "Email must be a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export function LoginForm() {
    // Initialize form handling using React Hook Form
    const form = useHookForm({
        resolver: zodResolver(formSchema),
    });

    // Initialize Inertia.js form handling
    const { data, setData, post, processing, errors, reset } = useInertiaForm({
        email: '',
        password: '',
    });

    const handleSubmit = (data) => {
        // Handle form submission
        console.log("submit : ",data)
        // post(route('login'), {
        //     onFinish: () => reset('password'),
        // });
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-3/4 mx-auto">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="rounded-md">
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="your-email@example.com"
                                    className="rounded-xl"
                                />
                            </FormControl>
                            <FormMessage />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="rounded-md">
                            <FormLabel className="text-white">Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="rounded-xl"
                                />
                            </FormControl>
                            <FormMessage />
                            {errors.password && <div className="text-red-500">{errors.password}</div>}
                        </FormItem>
                    )}
                />
                <div>
                    <Button
                        type="submit"
                        className="rounded-xl bg-white text-fountain-blue-400 hover:text-white hover:bg-fountain-blue-600"
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : 'Masuk'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
