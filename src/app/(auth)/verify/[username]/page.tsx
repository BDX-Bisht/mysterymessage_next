"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const page = () => {
    const router = useRouter();
    const { username } = useParams<{ username: string }>();

    // zod implementation
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: { code: "" },
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post("/api/verify-code", {
                username,
                code: data.code,
            });
            toast.success("Verification success", {
                description: response.data.message,
            });
            router.replace("/sign-in");
        } catch (error) {
            console.error("error in signup of user", error);
            const axiosError = error as AxiosError<ApiResponse>;

            const errorMsg =
                axiosError.response?.data?.message ??
                "Something wrong in signup user";
            toast.error("Verification failed", { description: errorMsg });
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <Card className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Verify Your Account
                        </h1>
                        <p className="mb-4">
                            Enter the verification code sent to your email
                        </p>
                    </div>
                    <form
                        id="verfiy-code"
                        className="mb-0"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <Controller
                                name="code"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="code">
                                            Code
                                        </FieldLabel>
                                        <InputOTP
                                            maxLength={6}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            {...field}
                                            name="code"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                        >
                                            <InputOTPGroup className="">
                                                {Array.from({ length: 6 }).map(
                                                    (_, index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                        />
                                                    ),
                                                )}
                                            </InputOTPGroup>
                                        </InputOTP>
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                        {/* <Input
                                            {...field}
                                            name="code"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter code"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                        /> */}
                                    </Field>
                                )}
                            />
                            <Field className=" w-full">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    form="verfiy-code"
                                >
                                    Submit
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default page;
