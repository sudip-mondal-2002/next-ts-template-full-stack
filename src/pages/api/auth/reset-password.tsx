import {NextApiRequest, NextApiResponse} from "next";
import {apiHandler} from "../../../middlewares/ErrorHandler";
import {HttpStatus} from "../../../enums";
import {ResetPasswordRequestController} from "../../../controllers/auth/ResetPasswordRequest";
import {ResetPasswordActController} from "../../../controllers/auth/ResetPasswordAct";

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email} = req.body;
    await ResetPasswordRequestController(email);
    return res.status(HttpStatus.OK).json({message: "Password reset request sent, check email"});
}

const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const {token, password} = req.body;
    await ResetPasswordActController(token, password);
    return res.status(HttpStatus.OK).json({message: "Password reset successful"});
}


export default apiHandler({
    POST: handlePostRequest,
    PUT: handlePutRequest
})