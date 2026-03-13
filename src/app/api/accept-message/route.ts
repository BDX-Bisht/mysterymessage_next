import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated",
            },
            { status: 401 },
        );
    }

    const userId = user._id;
    const { acceptMessages } = await req.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                isAcceptingMessage: acceptMessages,
            },
            { new: true },
        );

        if (!updatedUser) {
            return Response.json(
                {
                    status: false,
                    message: "failed to update user status to accpet messages",
                },
                { status: 401 },
            );
        }
        return Response.json(
            {
                status: true,
                message: "Message accpetance status update successfully",
                updatedUser,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log("failed to update user status to accpet messages");
        return Response.json(
            {
                status: false,
                message: "failed to update user status to accpet messages",
            },
            { status: 500 },
        );
    }
}

export async function GET(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated",
            },
            { status: 401 },
        );
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return Response.json(
                {
                    status: false,
                    message: "User not found",
                },
                { status: 404 },
            );
        }

        return Response.json(
            {
                status: true,
                isAcceptingMessage: foundUser.isAcceptingMessage,
            },
            { status: 200 },
        );
    } catch (error) {
        console.log("Error in getting message accpetance status");
        return Response.json(
            {
                status: false,
                message: "Error in getting message accpetance status",
            },
            { status: 500 },
        );
    }
}
