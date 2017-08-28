module.export = {
    failure: function(body) {
        return this.buildResponse(500, body);
    },
    success: function(body) {
        return this.buildResponse(200, body);
    },

    buildResponse: function (statusCode, body) {
        return {
            statusCode: statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(body)
        };
    }

};