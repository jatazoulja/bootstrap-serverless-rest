'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const resp = require('./lib/response.js');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = function(event, context, callback) {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.text !== 'string') {
        console.error('Validation Failed');
        callback(null, resp.failure({error:'Validation Failed'}));
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
        if (error) {
            console.error(error);
            callback(null, resp.failure(error));
            return;
        }

        callback(null, resp.success(params.Item));
    });
};