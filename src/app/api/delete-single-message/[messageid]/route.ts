import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import UserModel from "@/model/User";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ messageid: string }> },
) {
    const { messageid } = await params;
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

    if (!messageid) {
        return Response.json(
            {
                success: false,
                message: "Message not found",
            },
            { status: 400 },
        );
    }

    try {
        const updatedResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageid } } },
        );

        if (updatedResult.modifiedCount == 0) {
            return Response.json(
                {
                    success: false,
                    message: "Message not found or already deleted",
                },
                { status: 404 },
            );
        }

        return Response.json(
            {
                success: true,
                message: "Message deleted successfully",
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error in delete message", error);
        return Response.json(
            {
                success: false,
                message: "Error in delete message",
            },
            { status: 500 },
        );
    }
}
