import { sendErrorResponse } from "../../utils/response.js";

const AuthorizeRole = (allowedRoles) =>{
    return (req , res , next) =>{
        const userRole = req.user.role;
        if(!allowedRoles.includes(userRole)){
            return sendErrorResponse(res, 401, false, "Unauthorized");
        }

        next();
    }
}

export default AuthorizeRole