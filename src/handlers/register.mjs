import {
    CognitoIdentityProviderClient,
    SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-2" });
const clientId = process.env.COGNITO_CLIENTID;

export const registerHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`registerHandler only accepts POST method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    const { username, password } = JSON.parse(event.body);
    const params = {
        ClientId: clientId,
        Username: username,
        Password: password
    };

    try {
        const command = new SignUpCommand(params);
        var data = await cognitoClient.send(command);
    } catch (err) {
        console.log("Error", err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(
            {
                data: data,
                username: username,
                password: password
            })
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}