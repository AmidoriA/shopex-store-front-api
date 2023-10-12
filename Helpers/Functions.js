const formatAndReturn = (statusCode, data) => {
    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }; 
};
  
module.exports.formatAndReturn = formatAndReturn;
