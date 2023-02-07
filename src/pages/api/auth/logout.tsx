import {NextApiRequest, NextApiResponse} from "next";
import {LoginController} from "../../../controllers/auth/Login";
import {apiHandler} from "../../../middlewares/ErrorHandler";
import {HttpStatus} from "../../../enums";

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.setHeader("Set-Cookie", `token=; path=/; httpOnly; Secure`).status(HttpStatus.NO_CONTENT).send("");
}

export default apiHandler({
    GET: handleGetRequest
})