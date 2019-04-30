const AWS = require('aws-sdk');
//sample lambda function
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const Id = 1 + Math.floor(Math.random() * (65535));
    console.log('Received event (', Id, '): ', event);

    // The body field of the event in a proxy integration is a raw string.
    // In order to extract meaningful values, we need to first parse this string
    // into an object. A more robust implementation might inspect the Content-Type
    // header first and use a different parsing strategy based on that value.
    const requestBody = JSON.parse(event.body);

    recordLocation(Id, requestBody).then(() => {
        // You can use the callback function to provide a return value from your Node.js
        // Lambda functions. The first parameter is used for failed invocations. The
        // second parameter specifies the result data of the invocation.

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                Id: Id,
                SerialNumber: requestBody.serialNumber,
                Latitude: requestBody.lat,
                Longitude: requestBody.lon
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        errorResponse(err.message, context.awsRequestId, callback);
    });
};

function recordLocation(id, reqBody) {
    return ddb.put({
        TableName: 'dts-sample-app',
        Item: {
            id: id,
            SerialNumber: reqBody.serialNumber,
            Latitude: reqBody.lat,
            Longitude: reqBody.lon,
            RequestTime: new Date().toISOString(),
        },
    }).promise();
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
