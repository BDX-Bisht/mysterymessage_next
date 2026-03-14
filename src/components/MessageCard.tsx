"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import dayjs from "dayjs";

type messageCardProp = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: messageCardProp) => {
    const handleDeleteConfirm = async () => {
        try {
            const resposne = await axios.delete<ApiResponse>(
                `/api/delete-message/${message._id}`,
            );
            toast.success(resposne.data.message);
            onMessageDelete(message._id.toString());
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
                axiosError.response?.data.message || "Something went wrong",
            );
        }
    };
    return (
        <>
            <Card className="w-full">
                <CardContent className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-xl font-semibold">
                            {message.content}
                        </div>
                        <div className="mt-3">
                            {dayjs(message.createdAt).format(
                                "DD MMM YYYY hh:mm A",
                            )}
                        </div>
                    </div>
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account from our
                                        servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDeleteConfirm}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default MessageCard;
