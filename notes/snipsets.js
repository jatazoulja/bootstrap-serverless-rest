// get items
var params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
        apiId: event.pathParameters.id,
        ownerId: event.requestContext.authorizer.claims.sub

    }
};
dynamoDb.get(params, function(err, data) {
    if (err) {
        callback(null, resp.failure({error: err, dump: params, event: event}));
    } else {
        callback(null, resp.success(data.Item));
    }
});

//

/// CREATE
const timestamp = new Date();
const data = JSON.parse(event.body);
if (typeof data.content !== 'string') {
    console.error('Validation Failed');
    callback(null, resp.failure({error:'Validation Failed'}));
    return;
}

const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
        apiId: uuid.v1(),
        text: data.content,
        ownerId: event.requestContext.authorizer.claims.sub,
        checked: false,
        createdAt: timestamp.toString(),
        updatedAt: timestamp.getTime()
    }
};
dynamoDb.put(params, function(error)  {
    if (error) {
        console.error(error);
        callback(null, resp.failure(error));
        return;
    }

    callback(null, resp.success(params.Item));
});