'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = function(event, context, callback) {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.text !== 'string') {
        console.error('Validation Failed');
        callback(new Error('Couldn\'t create the todo item.'));
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            text: data.text,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };

    dynamoDb.put(params, function(error)  {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t create the todo item.'));
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
};