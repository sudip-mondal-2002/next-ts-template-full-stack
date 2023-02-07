import {NextApiRequest, NextApiResponse} from "next";
import {LoginController} from "../../../controllers/auth/Login";
import {UnauthorizedError} from "../../../errors/api";
import {apiHandler} from "../../../middlewares/ErrorHandler";
import {HttpStatus} from "../../../enums";

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password} = req.body;
    const {user, token} = await LoginController({email, password});
    if (!user || !token) throw new UnauthorizedError();
    return res.status(HttpStatus.OK)
        .setHeader("Set-Cookie", `token=${token}; path=/; httpOnly; Secure`)
        .json(user);
}


export default apiHandler({
    POST: handlePostRequest
})