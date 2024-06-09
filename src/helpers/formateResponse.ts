
function response(status: number, message: string, data?: any) {
    if (status.toString().charAt(0) === '2') {
        return {
            status: "success",
            message,
            data,
        };
    } else {
        return {
            status: "error",
            message,
            data:data||{},
        };
    }
}
export default response