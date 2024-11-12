// Pre-sign up function for Cognito that auto-confirms newly registered accounts
export const confirmUserHandler = (event, context, callback) => {
    console.info('received:', event);

    if("autoConfirmUser" in event.response) {
        event.response.autoConfirmUser = true;
    }

    callback(null, event);
};