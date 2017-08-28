'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const resp = require('./lib/response.js');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.main = function(event, context, callback) {
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
};