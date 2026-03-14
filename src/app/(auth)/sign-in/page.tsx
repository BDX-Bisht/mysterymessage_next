"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // zod implementation
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);
        const result = await signIn("credentials", {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });
        if (result?.error) {
            setIsSubmitting(false);
            toast.error("Signin failed", {
                description: "Incorrect username or password",
            });
        }

        if (result?.url) {
            toast.success("Login Successfully", { description: "Welcome" });
            router.replace("/dashboard");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-background">
                <Card className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Login Mystery Messages
                        </h1>
                        <p className="mb-4">
                            Sign in to start your anonymous adventure
                        </p>
                    </div>
                    <form
                        id="sign-in-form"
                        className="mb-0"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <Controller
                                name="identifier"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="identifier">
                                            Email / Username
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            name="identifier"
                                            type="text"
                                            placeholder="Enter email or username"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            name="password"
                                            type="password"
                                            placeholder="Enter password"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                        />
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <Field className="mt-4 w-full">
                            <Button
                                type="submit"
                                className="w-full"
                                form="sign-in-form"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                        Please Wait
                                    </>
                                ) : (
                                    "Signin"
                                )}
                            </Button>
                        </Field>
                    </form>
                    <div className="text-center mt-3">
                        <p>
                            New here?{" "}
                            <Link
                                href="/sign-up"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default page;
