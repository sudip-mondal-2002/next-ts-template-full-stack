import {NextApiRequest, NextApiResponse} from "next";
import {CurrentUserController} from "../../../controllers/auth/currentUser";

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).send("Invalid credentials");
    let user;
    try {
        user = await CurrentUserController(token);
    } catch (e) {
        return res.status(401).send("Invalid credentials");
    }
    if (!user) return res.status(404).send("User not found");
    return res.status(200).json(user);
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return handleGetRequest(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"});
    }
}