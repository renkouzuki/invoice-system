export const sendResponse = (res ,statusCode, success , message  , data) =>{
    res.status(statusCode).json({
        success,
        message,
        data
    })
}

export const sendErrorResponse = (res ,statusCode, success , message  , errors) =>{
    res.status(statusCode).json({
        success,
        message,
        errors
    })
}