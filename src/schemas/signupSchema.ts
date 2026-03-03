import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, { message: "Username must be alteast 2 character" })
    .max(20, { message: "Username must not be than 2 character" })
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not be contain special character");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be atleast 6 character" }),
});
