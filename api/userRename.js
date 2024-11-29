module.exports = async function (context, req) {
    const { clientPrincipal } = req.headers['x-ms-client-principal']
        ? JSON.parse(Buffer.from(req.headers['x-ms-client-principal'], 'base64').toString('ascii'))
        : {};

    if (!clientPrincipal) {
        context.res = {
            status: 401,
            body: "Unauthorized access",
        };
        return;
    }

    const userDetails = {
        id: clientPrincipal.userId,
        email: clientPrincipal.userDetails,
        name: clientPrincipal.userClaims.find(claim => claim.typ === 'name')?.val || "",
    };

    // Example: Send user details to your backend
    try {
        const response = await fetch('https://your-backend-api.com/user-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.statusText}`);
        }

        context.res = {
            status: 200,
            body: "User details sent successfully",
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`,
        };
    }
};
