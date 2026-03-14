"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { useChat } from "@ai-sdk/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultChatTransport, UIMessage } from "ai";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const page = () => {
    const [isSending, setIsSending] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [aiMessage, setAiMessage] = useState("");
    const [getAiMessages, setGetAiMessages] = useState([]);
    const { username } = useParams<{ username: string }>();

    const { setValue, handleSubmit, control } = useForm<
        z.infer<typeof messageSchema>
    >({
        resolver: zodResolver(messageSchema),
        defaultValues: { content: "" },
    });

    const { messages, sendMessage, setMessages } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/suggest-messages",
        }),
    });

    const suggestMessages = async () => {
        setIsSuggesting(true);
        setMessages([]);
        try {
            await sendMessage({ text: "" });
        } finally {
            setIsSuggesting(false);
        }
    };

    useEffect(() => {
        suggestMessages();
    }, []);

    const sendMessageToUser = async (data: z.infer<typeof messageSchema>) => {
        setIsSending(true);
        try {
            const response = await axios.post<ApiResponse>(
                "/api/send-message",
                { username, content: data.content },
            );
            toast.success("Send", { description: response.data.message });
            setAiMessage("");
        } catch (error) {
            console.error("error in signup of user", error);
            const axiosError = error as AxiosError<ApiResponse>;
            const errorMsg =
                axiosError.response?.data?.message ?? "Something went wrong";
            toast.error("Error", { description: errorMsg });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-7xl">
                <h3 className="text-center text-4xl font-bold">
                    Public Profile Link
                </h3>
                <Separator className="my-5" />
                <div className="">
                    <form
                        id="send-message"
                        onSubmit={handleSubmit(sendMessageToUser)}
                    >
                        <FieldGroup>
                            <Controller
                                name="content"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel
                                            htmlFor="content"
                                            className="text-base"
                                        >
                                            Send Anonymous Message to @
                                            {username}
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            name="content"
                                            className="h-30 mt-3"
                                            placeholder="Write your anonymous message here"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <div className="flex justify-end mt-4">
                            <Button
                                type="submit"
                                form="send-message"
                                disabled={isSending}
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 className=" h-4 w-4 animate-spin" />{" "}
                                        Sending
                                    </>
                                ) : (
                                    "Send"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
                <Separator className="my-5" />
                <div>
                    <div className="flex items-center justify-between">
                        <h4>Click on any message below to select it.</h4>
                        <Button
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={suggestMessages}
                            disabled={isSuggesting}
                        >
                            {isSuggesting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Suggesting...
                                </>
                            ) : (
                                "Suggest More"
                            )}
                        </Button>
                    </div>
                    <Card className="mt-4">
                        <CardHeader>
                            <h4 className="font-semibold text-xl">Messages</h4>
                        </CardHeader>
                        <CardContent>
                            {messages.map((message) => (
                                <div key={message.id}>
                                    {message.parts.map((part, i) => {
                                        switch (part.type) {
                                            case "text":
                                                return (
                                                    <div
                                                        className="flex flex-col gap-3"
                                                        key={`${message.id}-${i}`}
                                                    >
                                                        {part.text.length > 0 &&
                                                            part.text
                                                                .split(" || ")
                                                                .map(
                                                                    (
                                                                        txt,
                                                                        index,
                                                                    ) => (
                                                                        <div
                                                                            className="text-center p-3 border rounded-md cursor-pointer dark:hover:bg-[#1e1e1e] hover:bg-[#eee] ease-in-out transition-all duration-200 font-semibold"
                                                                            onClick={() => {
                                                                                setValue(
                                                                                    "content",
                                                                                    txt,
                                                                                );
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                txt
                                                                            }
                                                                        </div>
                                                                    ),
                                                                )}
                                                    </div>
                                                );
                                        }
                                    })}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default page;
