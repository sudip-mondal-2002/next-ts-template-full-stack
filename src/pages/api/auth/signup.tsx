import {NextApiRequest, NextApiResponse} from "next";
import {SignupController} from "../../../controllers/auth/Signup";
import {UnauthorizedError} from "../../../errors/api";
import {apiHandler} from "../../../middlewares/ErrorHandler";
import {HttpStatus} from "../../../enums";

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, password, name} = req.body;
    const {user, token} = await SignupController({email, password, name});
    if (!user || !token) throw new UnauthorizedError()
    return res.status(HttpStatus.CREATED)
        .setHeader("Set-Cookie", `token=${token}; path=/; httpOnly; Secure`)
        .json(user);
}


export default apiHandler({
    POST: handlePostRequest
})