const jwt = require('jsonwebtoken');

getUser = (token) => {
    let result = {
        statusCode: 200,
        error: '',
        user: null
    };
    try {
        result.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        result.statusCode = 400;
        result.error = error.message;
    }

    return result;
    
}

getUserFromEvent = (event) => {
    if (event.headers.Authorization == undefined) {
        return {
            statusCode: 400,
            error: 'Missing authorization header',
            user: null
        };
    }

    const splited = event.headers.Authorization.split(' ');

    if (splited.length < 2) {
        return {
            statusCode: 400,
            error: 'Invalid authorization header',
            user: null
        };
    }

    return getUser(splited[1]);
}

module.exports = { getUser, getUserFromEvent }