"use client";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { use, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

const page = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSwitchLoading, setIsSwitchLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    const handleDeleteMessage = async (messageid: string) => {
        setMessages(
            messages.filter((message) => message._id.toString() !== messageid),
        );
    };

    const { data: session } = useSession();
    const username = (session?.user as User | undefined)?.username ?? "";

    // TODO : do more research
    // const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    const profileUrl = `${baseUrl}/u/${username}`;

    const copyBtn = () => {
        copyToClipboard(profileUrl)
            .then(() => {
                setIsCopied(true);
                toast.success("Copy to clipboard");
                setTimeout(() => {
                    setIsCopied(false);
                }, 1000);
            })
            .catch(() => {
                toast.error("Copy to clipboard");
            });
    };

    const { register, watch, setValue } = useForm({
        resolver: zodResolver(acceptMessageSchema),
    });

    const acceptMessages = watch("acceptMessage");

    const fetchAcceptMessage = useCallback(async () => {
        setIsSwitchLoading(true);
        try {
            const response = await axios.get<ApiResponse>("api/accept-message");
            setValue(
                "acceptMessage",
                response.data.isAcceptingMessage || false,
            );
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error("Error", {
                description:
                    axiosError.response?.data.message ||
                    "Failed to fetch message settings",
            });
        } finally {
            setIsSwitchLoading(false);
        }
    }, [setValue]);

    const fetchMessages = useCallback(async (refresh: boolean = false) => {
        setIsLoading(true);
        setIsSwitchLoading(true);
        try {
            const response = await axios.get<ApiResponse>("api/get-messages");
            setMessages(response.data.messages || []);
            if (refresh) {
                toast.success("Refreshed Messages", {
                    description: "Showing latest messages",
                });
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            if (refresh) {
                toast.error("Error", {
                    description:
                        axiosError.response?.data.message ||
                        "Failed to fetch message",
                });
            }
        } finally {
            setIsLoading(false);
            setIsSwitchLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!session || !session.user) return;
        fetchMessages();
        fetchAcceptMessage();
    }, [session?.user, fetchMessages, fetchAcceptMessage]);

    const handleSwitchMessage = async () => {
        try {
            const response = await axios.post<ApiResponse>(
                "api/accept-message",
                {
                    acceptMessages: !acceptMessages,
                },
            );
            setValue("acceptMessage", !acceptMessages);
            toast.success(response.data.message);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error("Error", {
                description:
                    axiosError.response?.data.message ||
                    "Failed to fetch message settings",
            });
        }
    };

    if (!session || !session.user) {
        return (
            <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-7xl">
                <div className="flex flex-col gap-3">
                    {Array(10)
                        .fill(0)
                        .map((_, key) => (
                            <Skeleton
                                key={key + 1}
                                className="h-10 w-full rounded-md"
                            />
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-7xl">
            <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">
                    Copy Your Unique Link
                </h2>
                <div className="flex items-center">
                    <Input
                        type="text"
                        value={profileUrl}
                        disabled
                        className="w-full p-2 mr-2"
                    />
                    <Button onClick={copyBtn}>
                        {isCopied ? "Copied" : "Copy"}
                    </Button>
                </div>
            </div>
            <div className="flex items-center">
                <Switch
                    {...register("acceptMessage")}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchMessage}
                    disabled={isSwitchLoading}
                />
                <span className="ml-3">
                    Accept Messages : {acceptMessages ? "On" : "Off"}
                </span>
            </div>
            <Separator className="my-6" />
            <Button
                className=""
                variant="outline"
                onClick={(e) => {
                    e.preventDefault();
                    fetchMessages(true);
                }}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <RefreshCcw className="h-4 w-4" />
                )}
            </Button>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <MessageCard
                            key={msg._id.toString()}
                            message={msg}
                            onMessageDelete={handleDeleteMessage}
                        />
                    ))
                ) : (
                    <p>No Message to display</p>
                )}
            </div>
        </div>
    );
};

export default page;
