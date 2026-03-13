import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(req: Request) {
    await dbConnect();
    try {
        const { username, code } = await req.json();

        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 500 },
            );
        }

        return Response.json(
            {
                success: false,
                message: "User not found",
            },
            { status: 500 },
        );
    } catch (error) {
        console.log("error in adding messages", error);
        return Response.json(
            {
                success: false,
                message: "error in adding messages",
            },
            { status: 500 },
        );
    }
}
