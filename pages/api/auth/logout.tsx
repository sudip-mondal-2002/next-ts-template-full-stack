import {NextApiRequest, NextApiResponse} from "next";
import {LoginController} from "../../../controllers/auth/login";

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.setHeader("Set-Cookie", `token=; path=/; httpOnly; Secure`).status(204).send("");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return handleGetRequest(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"});
    }
}