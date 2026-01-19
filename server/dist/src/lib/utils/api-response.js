const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
        meta: data.meta,
    };
    res.status(data.statusCode).json(responseData);
};
export default sendResponse;
