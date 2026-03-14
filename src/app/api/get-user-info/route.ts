import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import z from "zod";

const UsernameQuerySchema = z.object({
    username: z.string(),
});

export async function GET(req: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);

        const queryParam = {
            username: searchParams.get("username"),
        };

        const result = UsernameQuerySchema.safeParse(queryParam);

        if (!result.success) {
            const usernameErrors =
                result.error?.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message:
                        usernameErrors?.length > 0
                            ? usernameErrors.join(",")
                            : "Invalid query parameter",
                },
                { status: 400 },
            );
        }

        const { username } = result.data;

        const user = await UserModel.findOne({ username });

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
                success: true,
                message: "User found",
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
