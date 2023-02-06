import {NextApiRequest, NextApiResponse} from "next";
import {SignupController} from "../../../controllers/auth/signup";

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password, name} = req.body;
    const {user, token} = await SignupController({email, password, name});
    if (!user || !token) return res.status(401).send("Invalid credentials");
    return res.status(200)
        .setHeader("Set-Cookie", `token=${token}; path=/; httpOnly; Secure`)
        .json(user);
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            return handlePostRequest(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"});
    }
}