const formatAndReturn = (statusCode, data = []) => {
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }; 
};

const UnauthorizedResponse = {
  statusCode: 401,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
};
  
module.exports.formatAndReturn = formatAndReturn;
module.exports.UnauthorizedResponse = UnauthorizedResponse;
