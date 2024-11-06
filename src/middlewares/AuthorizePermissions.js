import { sendErrorResponse } from "../../utils/response.js";

const AuthorizePermissions = (permissionsRequired) =>{
    return (req , res , next) =>{
        const userPermissions = req.user.permissions;
        
        const hasPermission = permissionsRequired.some(
            perm => userPermissions.includes(perm)
        )

        if(!hasPermission){
            return sendErrorResponse(res, 403, false, "You do not have permission to perform this action");
        }
        next();
    }
}

export default AuthorizePermissions